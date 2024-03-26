import {defineStore} from 'pinia'
import {nextTick} from 'vue'
import {isEmpty} from 'lodash'
import {router} from '@/router'


const name = 'tabs'

export const useTabs = defineStore(name, {
    state: () => ({
        tabViews: [],
        refreshFlag: true,
    }),
    actions: {

        addTab(view) {

            const index = this.tabViews.findIndex((e) => e.path == view.path)

            if (index == -1) {

                this.tabViews.push(view)
            }

        },
        refreshView() {
            this.refreshFlag = false
            nextTick(() => {
                this.refreshFlag = true
            })
        },

        removeTab(tabName) {
            this.tabViews = this.tabViews.filter((e) => e.path != tabName)
            this.setActiveTab()
        },

        removeTabs(retainViews) {
            this.tabViews = retainViews
            this.setActiveTab()
        },

        setActiveTab() {

            const filter = this.tabViews.filter(
                (e) => e.path == router.currentRoute.value.path
            )
            if (isEmpty(filter)) {

                router.replace(this.tabViews[this.tabViews.length - 1])
            }
        },
    },
    persist: {
        key: name,
    },
})

