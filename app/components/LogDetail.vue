<template>
  <div class="w-full border-2 rounded-sm flex items-center flex-col cursor-pointer"
       :class="!isException ? 'border-green-300 ':'border-red-300 '"
  >
    <div class="w-full flex justify-between h-[30px] items-center rounded-sm px-[25px]"
         :class="!isException ? 'bg-green-300 ':'bg-red-300'" @click="changeShow">
      <div class=" flex items-end space-x-2 justify-between w-full px-[25px]">
        <h3 class="text-gray-800 text-[15px] font-bold ">{{ detail.logType }}</h3>
        <h3 class="flex  text-gray-600 text-[15px]"> Duration : <p> {{ detail.stepTime }} ms</p></h3>
      </div>
      <button class="w-[25px] h-[25px] rounded-lg border-2 flex items-center justify-center border-b-gray-600"
      >
        <ChevronDownIcon class="w-6 h-6 text-gray-600 cursor-pointer transition-all duration-100"
                         :class="!isShow ?'rotate-180' : ''"/>
      </button>
    </div>
    <div
        class="flex flex-col w-full overflow-hidden transition-all duration-200"
        :class="isShow ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="w-full flex justify-end pr-[25px] pt-[10px]">
        <button class="w-[30px] h-[30px] rounded-lg border-2 flex items-center justify-center border-black"
                @click="copyJson"
        >

          <CheckIcon v-if="copied" class="w-8 h-8 text-gray-800 cursor-pointer transition-all duration-100"/>
          <DocumentDuplicateIcon v-else class="w-5 h-5 text-gray-800 cursor-pointer transition-all duration-100"/>
        </button>
      </div>
      <div class="overflow-scroll">
        <json-data :data="props.detail"/>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {type ILog, LogType} from "@/utils/Log";
import {computed, ref} from "vue";
import {syntaxHighlight} from "@/utils/SyntaxHighlight";
import JsonData from "@/components/JsonData.vue";
import {ChevronDownIcon} from "@heroicons/vue/16/solid";
import {DocumentDuplicateIcon, CheckIcon} from "@heroicons/vue/24/outline";

export interface LogDetailProps {
  detail: ILog
}

const copied = ref<boolean>(false);
const isException = computed(() =>
    props.detail?.logType === LogType.EXCEPTION
    || JSON.stringify(props.detail ?? {}).includes('exception')
);

const props = defineProps<LogDetailProps>()
const outputHtml = ref('')
const isShow = ref<boolean>(false)


outputHtml.value = syntaxHighlight(JSON.stringify(props.detail, null, 2))

const changeShow = () => {
  isShow.value = !isShow.value;
}
const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(props.detail, null, 2))
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  } catch (err) {
    console.error(err)
  }
}
</script>

<style lang="scss" scoped>

</style>