<template>
  <ModalRight @modalHide="cancel">
    <template #body v-if="order.id">
      <div>
        <div class="mt-2">
          <div class="info-split">
            <p class="title">Pedido</p>
            <p class="title">Valor</p>
            <p class="title">Status</p>
          </div>
          <div class="info-split">
            <span>#{{ order.id }}</span>
            <span> R$ {{ Number.parseFloat(order.amount).toFixed(2) }}</span>
            <span :class="order.status">{{ getStatusName(order.status) }}</span>
          </div>
          <div class="mt-2">
            <p class="title">Data</p>
            <span>{{ moment(order.created_at).format('DD/MM/YYYY') }}</span>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="title">Cliente</h3>
          <div class="mt-2">
            <p class="title">Nome</p>
            <span>{{ order.customer.name }}</span>
          </div>

          <div class="mt-2">
            <div class="info-split">
              <p class="title">E-mail</p>
              <p class="title">Telefone</p>
              <div></div>
            </div>
            <div class="info-split">
              <span>{{ order.customer.email }}</span>
              <span>{{ order.customer.phone }}</span>
              <div></div>
            </div>
          </div>
        </div>

        <div class="proposal">
          <Buttons >
            Enviar proposta
          </Buttons>
        </div>

      </div>
    </template>
  </ModalRight>
</template>

<script>
import ModalRight from '@/components/base/ModalRight.vue'
import Client from '@/services/Client'
const client = new Client()
import Buttons from '@/components/Button.vue'

export default {
  props: ['callId'],
  data: () => {
    return {
      order: {},
    }
  },
  watch: {
    callId: function () {
      if (this.callId) {
        this.show()
      }
    },
  },
  components: {
    ModalRight,
    Buttons
  },
  computed: {
    getStatusName() {
      return (status) => {
        // 'BUDGET', 'ACCEPTED', 'CANCELED', 'FINISHED'
        switch (status) {
          case 'BUDGET':
            return 'Orçamento'
          case 'ACCEPTED':
            return 'Aceito'
          case 'CANCELED':
            return 'Cancelado'
          case 'FINISHED':
            return 'Finalizado'
          default:
            return 'Erro'
        }
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('modalHide')
    },
    async show() {
      let response = await client.get('order/' + this.callId)
      this.order = response.data
      console.log(this.order)
    },
  },
}
</script>

<script setup>
import moment from 'moment'
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: bold;
}

.info-split {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
/* 'BUDGET', 'ACCEPTED', 'CANCELED', 'FINISHED' */
.BUDGET {
  color: rgb(0, 4, 255);
}
</style>