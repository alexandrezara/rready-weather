<template>
  <div class="app-weather-card" :key="widget.cityName" :class="cssClasses">
    <span class="title">{{ widget!.cityName }}</span>
    <span class="subtitle">{{ widget!.cityLocation }}</span>

    <transition name="slide-fade" mode="out-in">
      <div v-if="isLoading" class="panel status">
        <span>Loading</span>
      </div>

      <div v-else-if="isFail" class="panel status fail">
        <span>Ops! Something went wrong...</span>
        <span>Click refresh</span>
        <app-icon
          src="icon-refresh.svg"
          :size="36"
          :clicable="true"
          @click="refresh"
        />
      </div>

      <app-weather-card-config
        v-else-if="configuringMode"
        class="panel"
        :settings="widget.settings!"
        @update-settings="updateSettings"
      />

      <app-weather-card-main
        v-else-if="showingPanel(0)"
        class="panel"
        :weather="widget.weather!"
        :unit="temperatureUnit"
      />

      <app-weather-card-extra
        v-else-if="showingPanel(1)"
        class="panel"
        :weather="widget.weather!"
        :settings="widget.settings!"
        :unit="temperatureUnit"
      />
    </transition>
    <app-icon
      v-if="showIconNext"
      class="action-icon"
      src="icon-next.svg"
      :size="36"
      :clicable="true"
      @click="nextPanel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppIcon from "./base/AppIcon.vue";
import AppCheckbox from "./base/AppCheckbox.vue";
import { TemperatureUnit } from "@rready/weather-sdk";
import AppWeatherCardMain from "./AppWeatherCardMain.vue";
import AppWeatherCardExtra from "./AppWeatherCardExtra.vue";
import AppWeatherCardConfig from "./AppWeatherCardConfig.vue";
import { IWidget } from "@/model/IWidget";
import { IMutationWidgetUpdateSettings } from "@/store/mutations";

const PANEL_COUNT = 2;

export default defineComponent({
  name: "AppWeatherCard",
  emits: ["request-weather-update"],
  components: {
    AppIcon,
    AppCheckbox,
    AppWeatherCardMain,
    AppWeatherCardExtra,
    AppWeatherCardConfig,
  },
  props: {
    widget: {
      type: Object as PropType<IWidget>,
      required: true,
    },
  },
  mounted() {
    if (this.widget.weather == undefined) {
      this.refresh();
    }
  },
  data: function() {
    return {
      temperatureUnit: TemperatureUnit.Celsius,
      panel: 0,
    };
  },
  computed: {
    isLoading() {
      return this.widget.success && this.widget.weather == undefined;
    },
    isFail() {
      return !this.widget.success;
    },
    configuringMode() {
      return this.$store.state.configuringMode;
    },
    showIconNext() {
      return (
        !this.isLoading &&
        !this.isFail &&
        !this.configuringMode &&
        this.haveExtraInfo
      );
    },
    haveExtraInfo() {
      return (
        this.widget.settings.showTemperature ||
        this.widget.settings.showSunrise ||
        this.widget.settings.showWindSpeed
      );
    },
    cssClasses() {
      return {
        settings: this.configuringMode,
        info: !this.configuringMode,
      };
    },
  },
  methods: {
    showingPanel(index: number) {
      if (!this.haveExtraInfo) {
        return index == 0;
      }
      return index == this.panel;
    },
    nextPanel() {
      this.panel = (this.panel + 1) % PANEL_COUNT;
    },
    refresh() {
      this.$emit("request-weather-update", this.widget.cityName);
    },
    updateSettings(settings: any) {
      this.$store.commit("widgetUpdateSettings", {
        city: this.widget.cityName,
        settings: settings,
      } as IMutationWidgetUpdateSettings);
    },
  },
});
</script>

<style scoped lang="sass">
@import "@/styles/transitions.sass"

.app-weather-card
  position: relative
  border: 2px solid white !important
  display: flex
  flex-direction: column
  align-items: center
  min-width: 220px
  max-width: 220px
  min-height: 190px
  padding: $size-border-radius
  border-radius: $size-border-radius
  overflow: hidden

  &.info
    @include drop-shadow

  .title
    display: inline-block
    font-size: $font-medium
    line-height: 1

  .subtitle
    display: inline-block
    font-size: $font-small
    margin-bottom: $space-small

  .panel
    position: relative
    flex-grow: 1

  .status
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    text-align: center

  .fail
    font-size: $font-small

  .action-icon
    align-self: flex-end
</style>
