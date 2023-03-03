<template>
    <button
        class="flex items-center justify-center transition text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :class="[
            props.variant === 'primary'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : '',
            props.variant === 'secondary'
                ? 'bg-gray-200 hover:bg-gray-100 text-gray-800'
                : '',
            props.circular ? 'rounded-full' : 'rounded-md',
            props.icon ? 'p-1' : 'px-3 py-2'
        ]"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
type UiButtonProps = {
    variant?: "primary" | "secondary";
    circular?: boolean;
    icon?: boolean;
};

const props = withDefaults(defineProps<UiButtonProps>(), {
    variant: "primary",
    circular: false
});
</script>
