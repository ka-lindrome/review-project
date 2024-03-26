import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

/**
 * @description 生成excel array
 */
function generateArray(table) {
  const out = [];
  const rows = table?.querySelectorAll('tr');
  const ranges = [];
  for (let R = 0; R < rows.length; ++R) {
    const outRow = [];
    const row = rows[R];
    const columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      const cell = columns[C];
      let colspan = cell.getAttribute('colspan');
      let rowspan = cell.getAttribute('rowspan');
      let cellValue = cell.innerText;
      if (typeof cellValue === 'number' && cellValue === Number(cellValue)) cellValue = Number(cellValue);

      ranges.forEach((range) => {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + Number(rowspan) - 1,
            c: outRow.length + Number(colspan) - 1
          }
        });
      }

      outRow.push(cellValue !== '' ? cellValue : null);

      if (colspan) for (let k = 0; k < Number(colspan) - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function datenum(date, date1904) {
  if (date1904) date = Number(date) + 1462;
  const epoch = Date.parse(String(date));
  return (epoch - Date.parse(String(new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
}

/**
 * @description sheet  General Structures
 */
function sheetFromArrayOfArrays(data) {
  const worksheet = {};
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      const cell = {
        v: data[R][C]
      };
      if (cell.v !== null) {
        const cellRef = XLSX.utils.encode_cell({
          c: C,
          r: R
        });

        if (typeof cell.v === 'number') cell.t = 'n';
        else if (typeof cell.v === 'boolean') cell.t = 'b';
        else if (cell.v instanceof Date) {
          cell.t = 'n';
          const z = XLSX.SSF.parse_date_code(14);
          cell.z = z;
          cell.v = datenum(cell.v);
        } else cell.t = 's';

        worksheet[cellRef] = cell;
      }
    }
  }
  if (range.s.c < 10000000) worksheet['!ref'] = XLSX.utils.encode_range(range);
  return worksheet;
}

class Workbook {
  constructor(nameParams = [], sheetsParams = {}) {
    this.SheetNames = nameParams;
    this.Sheets = sheetsParams;
  }
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function exportTableToExcel(id) {
  const table = document.getElementById(id);
  const excelArray = generateArray(table);
  const ranges = excelArray[1];

  const data = excelArray[0];
  const wsName = 'SheetJS';

  const wb = new Workbook();
  const worksheet = sheetFromArrayOfArrays(data);

  worksheet['!merges'] = ranges;

  wb.SheetNames.push(wsName);
  wb.Sheets[wsName] = worksheet;

  const wbOutput = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(
    new Blob([s2ab(wbOutput)], {
      type: 'application/octet-stream'
    }),
    'test.xlsx'
  );
}

export function exportJsonToExcel(params) {
  const filename = params?.filename ?? 'defaultExcel';
  const bookType = params?.bookType ?? 'xlsx';
  const multiHeader = params?.multiHeader ?? [];
  const merges = params?.merges ?? [];
  const autoWidth = params.autoWidth ?? true;
  const data = [...params.data];
  data.unshift(params.header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }

  const wsName = 'SheetJS';
  const wb = new Workbook();
  const worksheet = sheetFromArrayOfArrays(data);

  if (merges.length > 0) {
    if (!worksheet['!merges']) worksheet['!merges'] = [];
    merges.forEach((item) => {
      worksheet['!merges'].push(XLSX.utils.decode_range(item));
    });
  }

  if (autoWidth) {
    const colWidth = data.map((row) => {
        if (row) {
            return row.map((val) => {
              if (val == null) {
                return {
                  wch: 10
                };
              }
              if (val.toString().charCodeAt(0) > 255) {
                return {
                  wch: val.toString().length * 2
                };
              }
              return {
                wch: val.toString().length
              };
            });
          }
          return [];
        });
        const result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
          for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j].wch < colWidth[i][j].wch) {
              result[j].wch = colWidth[i][j].wch;
            }
          }
        }
        worksheet['!cols'] = result;
      }
    
      wb.SheetNames.push(wsName);
      wb.Sheets[wsName] = worksheet;
    
      const wbData = XLSX.write(wb, {
        bookType,
        bookSST: false,
        type: 'binary'
      });
    
      saveAs(
        new Blob([s2ab(wbData)], {
          type: 'application/octet-stream'
        }),
        `${filename}.${bookType}`
      );
    }
    
    export default { exportTableToExcel, exportJsonToExcel };
    
