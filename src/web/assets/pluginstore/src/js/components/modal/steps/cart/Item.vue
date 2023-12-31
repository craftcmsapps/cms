<template>
  <div
    v-if="item"
    class="tw-border-b tw-border-solid tw-border-gray-200 md:tw-flex tw-py-2"
  >
    <div class="md:tw-mr-6 tw-pt-4 md:tw-pb-4 md:tw-px-4">
      <item-icon :item="item" />
    </div>

    <div class="tw-flex-1">
      <div class="tw-flex tw-justify-between tw-py-4">
        <!-- Item name -->
        <div>
          <item-name class="tw-flex-1" :item="item" />

          <template
            v-if="
              item.lineItem.purchasable.type === 'cms-edition' ||
              item.lineItem.purchasable.type === 'plugin-edition'
            "
          >
            <div class="tw-mt-1 tw-text-sm tw-text-gray-500">
              {{ 'Includes one year of updates.' | t('app') }}
            </div>
          </template>
        </div>

        <div class="tw-text-right">
          <!-- Price -->
          <div class="price tw-w-24 tw-text-right">
            <strong>{{ item.lineItem.price | currency }}</strong>
          </div>

          <!-- Remove button-->
          <div>
            <template v-if="!removeItemLoading">
              <button
                :disabled="totalLoadingItems > 0"
                class="tw-text-blue-600 hover:tw-underline"
                :class="{
                  'tw-opacity-50': totalLoadingItems > 0,
                }"
                @click="removeFromCart"
              >
                {{ 'Remove' | t('app') }}
              </button>
            </template>
            <template v-else>
              <c-spinner class="sm" />
            </template>
          </div>
        </div>
      </div>

      <item-updates :item="item" :item-key="itemKey" />

      <item-adjustments :item="item" />
    </div>
  </div>
</template>

<script>
  /* global Craft */

  import ItemIcon from './ItemIcon';
  import ItemName from './ItemName';
  import ItemAdjustments from './ItemAdjustments';
  import ItemUpdates from './ItemUpdates.vue';
  import {mapGetters} from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
      itemKey: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        removeItemLoading: false,
      };
    },

    components: {
      ItemUpdates,
      ItemAdjustments,
      ItemName,
      ItemIcon,
    },

    computed: {
      ...mapGetters({
        totalLoadingItems: 'cart/totalLoadingItems',
      }),
    },

    methods: {
      removeFromCart() {
        this.removeItemLoading = true;

        this.$store
          .dispatch('cart/removeFromCart', this.itemKey)
          .then(() => {
            this.removeItemLoading = false;
          })
          .catch((response) => {
            const errorMessage =
              response.errors &&
              response.errors[0] &&
              response.errors[0].message
                ? response.errors[0].message
                : 'Couldn’t remove item from cart.';
            this.$root.displayError(errorMessage);
          })
          .finally(() => {
            this.removeItemLoading = false;
          });
      },
    },
  };
</script>
