<template>
  <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4">{{ isEdit ? 'Editar' : 'Nova' }} Manutenção</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Equipamento
        </label>
        <input
          v-model="form.equipment"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Manutenção
        </label>
        <select
          v-model="form.type"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecione...</option>
          <option value="preventiva">Preventiva</option>
          <option value="corretiva">Corretiva</option>
          <option value="preditiva">Preditiva</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data Programada
        </label>
        <input
          v-model="form.scheduledDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Prioridade
        </label>
        <select
          v-model="form.priority"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecione...</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Descrição
      </label>
      <textarea
        v-model="form.description"
        rows="3"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    
    <div class="flex justify-end space-x-3 mt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'MaintenanceForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      form: {
        equipment: '',
        type: '',
        scheduledDate: '',
        priority: '',
        description: ''
      }
    }
  },
  mounted() {
    if (this.isEdit && this.initialData) {
      this.form = { ...this.initialData }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.form })
      if (!this.isEdit) {
        this.resetForm()
      }
    },
    resetForm() {
      this.form = {
        equipment: '',
        type: '',
        scheduledDate: '',
        priority: '',
        description: ''
      }
    }
  }
}
</script>