<template lang="html">
  <table class="v__table">
    <colgroup>
      <col
        v-for="(tableColumn,index) in tableColumns"
        :key="index"
        :width="tableColumn.width"
      >
    </colgroup>
    <thead>
      <tr>
        <th
          v-for="(tableColumn,index) in tableColumns"
          :key="index"
        >
          {{tableColumn.label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="v__row"
        :class="{ active__row: activeRowIndex === rowIndex}"
        v-for="(row, rowIndex) in rows"
        :key="formId(row)"
        @click="onRowClicked(row, rowIndex)">
        <td
          v-for="(tableColumn,index2) in tableColumns"
          :key="`col-${formId(row)}-${index2}`"
          :class="columnClass(tableColumn)">
            <span v-if="tableColumn.icons && tableColumn.icons.length" class="flex flex-to-right">
              <v-icon
                class="action__icon flex-auto"
                v-for="(icon,iconIndex) in tableColumn.icons"
                :key="iconIndex"
                :clickedIcon="icon.clickable"
                :center="icon.center"
                @click="iconClicked(icon, row)"
              >
                <img class="action__icon" :src="iconUrl(icon, row)" />
              </v-icon>
            </span>
            <span v-else-if="isStringColumn(tableColumn, row)">
              {{ getColumnValue(tableColumn, row) }}
            </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { forEach } from 'lodash'
  import vIcon from '@/components/v-icon'

  export default {
    name: 'vTable',
    components: {
      'v-icon': vIcon
    },
    props: {
      columns: { // колонки в таблице (наименование, пол изменение)
        type: Array,
        default: () => ([]),
        prop: {
          label: String,
          field: Function, // функция как рисовать поле
          width: String, // ширина колонки
          align: String, // выравнивание колонки (left, right, center)
          icons: [] // массив иконок { type: row => 'edit', clickable: true }
        }
      },
      rows: { // элементы списка
        type: Array,
        default: () => ([]),
        prop: {
          id: String,
          name: String,
          // ... любые другие поля элемента
        }
      },
      activeRowIndex: { // выбранный элемент списка
        type: Number
      }
    },
    computed: {
      tableColumns () {
        const tableColumns = []

        forEach(this.columns, column => {
          const widthColumn = column.width || `${100 / this.columns.length}%`

          tableColumns.push({
            ...column,
            width: widthColumn
          })
        })
        return tableColumns
      }
    },
    methods: {
      columnClass (tableColumn) {
        const cssClass = {
          col__right: tableColumn.align === 'right',
          col__center: tableColumn.align === 'center'
        }

        if (tableColumn.class) {
          cssClass[tableColumn.class] = true
        }

        return cssClass
      },

      formId (row) {
        // eslint-disable-next-line
        return JSON.stringify(row).replace(/(\,|"|:| )/g, '')
      },

      isStringColumn (tableColumn, row) {
        const value = typeof this.getColumnValue(tableColumn, row)

        return ~['string', 'number'].indexOf(value)
      },

      getColumnValue (column, row) {
        const { field } = column

        if (typeof field === 'undefined') {
          return ''
        }

        if (typeof field === 'function') {
          return field(row)
        }

        // тут может быть как объект так и строка и число
        return field
      },

      onRowClicked (row, rowIndex) {
        this.$emit('rowClicked', { row, rowIndex })
      },

      iconClicked (icon, row) {
        this.$emit('iconClicked', { icon, row })
      },

      iconUrl (icon, row) {
        let { type } = icon

        if (typeof type === 'function') {
          type = type(row)
        }

        switch (type) {
          case 'view':
            return require('@/assets/img/document.svg')
          case 'edit':
            return require('@/assets/img/edit-pencil.svg')
          case 'delete':
            return require('@/assets/img/delete-icon.svg')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .v__table
    width: 100%
    border-collapse: collapse

  .v__table th
    color: #606060
    border: 1px solid #e5e1e1
    background-color: #f7edde

  .v__row
    background-color: white

  .v__row td
    border: 1px solid #e5e1e1
    color: #3f3f3f

  .v__table th,
  .v__row td
    padding: 10px
    font-size: 12px
    line-height: 1.42
    font-weight: normal

  .v__row:hover
    cursor: pointer
    background-color: #efefef

  .v__row.active__row
    background-color: #daf1de

  .col__right
    text-align: right

  .col__center
    text-align: center

  .action__icon + .action__icon
    margin-left: 14px
</style>
