<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue';
import { type Subject } from '@cosmic/core/rxjs';
import { MTitle, MWidget, service } from '@cosmic/core/browser';
import { inject, BaseNodeMixin, LayoutMixin, SceneNode, hasMixin } from '@cosmic/core/parts';
import { Select, SelectOption, Row, Col} from 'cosmic-vue';

import { VerticalStretchValue, HorizontalStretchValue, HorizontalLayoutValue, VerticalLayoutValue } from './data';

interface LayoutData {
    // layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
    HorizontalStretch: number,
    VerticalStretch: number,
    VerticalLayout: number;
    HorizontalLayout: number;
}


const data: Ref<LayoutData>  = ref({
    HorizontalStretch: 0,
    VerticalStretch: 0,
    VerticalLayout: 0,
    HorizontalLayout: 0,

} as LayoutData);


const isShow = ref(false);
const isOpen = ref(true);
const nodeService = inject<service.NodeService>(service.TOKENS.Node);
let subject: Subject<BaseNodeMixin>;


let node: SceneNode | undefined;
nodeService.selection.subscribe(nodes => {
    isShow.value = false;
    node = undefined;
    nodeService.unwatch(subject as any);
    if (nodes.length) {
        node = nodes[0] as SceneNode;
        if (!hasMixin(node, LayoutMixin) || !hasMixin(node.parent, LayoutMixin)) {
            return;
        }
        subject = nodeService.watch(node);
        subject.subscribe((n) => {
            toData(n as any);
        });
        toData(node);
        isShow.value = true;
    }
});

const HorizontalLayoutValues = ref(HorizontalLayoutValue);
const VerticalLayoutValues = ref(VerticalLayoutValue);
const stateHelper = ref({top: false, right: false, bottom: false, left: false, x: false, y: false});

function toData(node: LayoutMixin) {
    data.value.VerticalStretch = node.VerticalStretch || 0;
    data.value.HorizontalStretch = node.HorizontalStretch || 0;
    data.value.VerticalLayout = node.VerticalLayout || 0;
    data.value.HorizontalLayout = node.HorizontalLayout || 0;
    HorizontalLayoutValues.value = HorizontalLayoutValue.slice(0, node.HorizontalStretch ? 3: 5);
    VerticalLayoutValues.value = VerticalLayoutValue.slice(0, node.VerticalStretch ? 3: 5);
}

watchEffect(() => {
    stateHelper.value.top = false;
    stateHelper.value.y = false;
    stateHelper.value.bottom = false;
    switch(data.value.VerticalLayout) {
        case 0:
            stateHelper.value.top = true;
            break;
        case 1:
            stateHelper.value.bottom = true;
            break;
        case 2:
            stateHelper.value.top = true;
            stateHelper.value.bottom = true;
            break;
        case 3:
            stateHelper.value.y = true;
            break;
        case 4:
            stateHelper.value.y = true;
            stateHelper.value.top = true;
            stateHelper.value.bottom = true;
            break;
    }

    stateHelper.value.left = false;
    stateHelper.value.x = false;
    stateHelper.value.right = false;
    switch(data.value.HorizontalLayout) {
        case 0:
            stateHelper.value.left = true;
            break;
        case 1:
            stateHelper.value.right = true;
            break;
        case 2:
            stateHelper.value.left = true;
            stateHelper.value.right = true;
            break;
        case 3:
            stateHelper.value.x = true;
            break;
        case 4:
            stateHelper.value.x = true;
            stateHelper.value.left = true;
            stateHelper.value.right = true;
            break;
    }
});

function change() {
    if (!node) return;
    switch (node.HorizontalLayout) {
        case 0:
            break;
        case 1:
            node.r = (node as any)?.parent?.width - node.width - node.x;
            break;
        case 2:
            node.r = (node as any)?.parent?.width - node.width - node.x;
            break;
        case 3:
            break;
        case 4:
            break;
    }
    switch (node.VerticalLayout) {
        case 0:
            break;
        case 1:
            node.b = (node as any)?.parent?.height - node.height - node.y;
            break;
        case 2:
            node.b = (node as any)?.parent?.height - node.height - node.y;
            break;
        case 3:
            break;
        case 4:
            break;
    }
}

</script>

<template>
    <div v-show="isShow" class="border-bottom" />
    <m-widget v-show="isShow">
        <MTitle :is-open="open" @on-click="boardSwitch">
            <template #prefix>
                大小 & 位置
            </template>
            <i-cosmic-arrow-up v-if="isOpen" @click="isOpen = flase" />
            <i-cosmic-arrow-down v-else @click="isOpen = true" />
        </MTitle>
        <div v-show="isOpen">
            <Row v-show="false" :class="$style.row">
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="5"
                >
                    <Select
                        size="sm"
                        :value="data.HorizontalStretch"
                        @on-change="({value}) => {node.HorizontalStretch = parseInt(value); node.update();}"
                    >
                        <template #prefix>
                            <i-cosmic-offset-x v-if="data.HorizontalStretch == 0" />
                            <i-cosmic-scale-x v-else />
                        </template>
                        <select-option
                            v-for="sv of HorizontalStretchValue"
                            :key="sv.value"
                            :value="sv.value"
                            :label="sv.label"
                        />
                    </Select>
                </Col>
                <!-- <Col :span="1" /> -->
                <Col
                    class="flex"
                    :class="$style.col"
                    :span="5"
                >
                    <Select
                        size="sm"
                        :value="data.VerticalStretch"
                        @on-change="({value}) => {node.VerticalStretch = parseInt(value); node.update();}"
                    >
                        <template #prefix>
                            <i-cosmic-offset-y v-if="data.VerticalStretch == 0" />
                            <i-cosmic-scale-y v-else />
                        </template>
                        <select-option
                            v-for="sv of VerticalStretchValue"
                            :key="sv.value"
                            :value="sv.value"
                            :label="sv.label"
                        />
                    </Select>
                </Col>
            </Row>
            <Row :class="$style.row">
                <Col
                    class="flex ml-6"
                    :class="$style.col"
                    :span="4"
                >
                    <!-- #546BFF -->
                    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" :class="$style.helper">
                        <g fill="none" fill-rule="evenodd">
                            <rect stroke="#E0E0E0" fill="#FFF" x=".5" y=".5" width="63" height="63" rx="4" />
                            <rect stroke="#25252B" x="20.5" y="20.5" width="23" height="23" rx="4" />
                            <path d="M23 23h18v18H23z" />
                            <path dir d="M28 32.5v-1h8v1z" :class="stateHelper.x?'active':''" />
                            <path dir d="M31.5 28h1v8h-1z" :class="stateHelper.y?'active':''" />
                            <path dir d="M5 32.75v-1.5h10v1.5z" :class="stateHelper.left?'active':''" />
                            <path dir d="M31.25 50.25h1.5v8h-1.5z" :class="stateHelper.bottom?'active':''" />
                            <path dir d="M50.25 32.75v-1.5h8v1.5z" :class="stateHelper.right?'active':''" />
                            <path dir d="M31.25 5.25h1.5v10h-1.5z" :class="stateHelper.top?'active':''" />
                        </g>
                    </svg>
                </Col>
                <Col
                    class="flex flex-col"
                    :class="$style.col"
                    :span="5"
                >
                    <template v-if="HorizontalLayoutValues.length == 3">
                        <Select
                            size="sm" :value="data.HorizontalLayout"
                            @on-change="({ value }) => { node.HorizontalLayout = parseInt(value); change(); }"
                        >
                            <select-option
                                v-for="sv of HorizontalLayoutValues" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                    </template>
                    <template v-else>
                        <Select
                            size="sm" :value="data.HorizontalLayout"
                            @on-change="({ value }) => { node.HorizontalLayout = parseInt(value); change(); }"
                        >
                            <select-option
                                v-for="sv of HorizontalLayoutValues" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                    </template>
                    <template v-if="HorizontalLayoutValues.length == 3">
                        <Select
                            class="mt-6"
                            size="sm" :value="data.VerticalLayout"
                            @on-change="({ value }) => { node.VerticalLayout = parseInt(value); change(); }"
                        >
                            <select-option
                                v-for="sv of VerticalLayoutValues" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                    </template>
                    <template v-else>
                        <Select
                            class="mt-6"
                            size="sm" :value="data.VerticalLayout"
                            @on-change="({ value }) => { node.VerticalLayout = parseInt(value); change(); }"
                        >
                            <select-option
                                v-for="sv of VerticalLayoutValues" :key="sv.value" :value="sv.value"
                                :label="sv.label"
                            />
                        </Select>
                    </template>
                </Col>
            </Row>
        </div>
    </m-widget>
</template>


 <style module>
.menu {
    font-size: 1.2rem;
}

.row {
    composes: mb-10 from global;
}

.icon {
    font-size: 1rem;
}

.lock-icon {
    flex: 0 0 2.4rem;
    margin-left: .8rem;
    /* background-color: red */
}

.col {
    margin-right: .8rem;
    font-size: 1.2rem;
}
.flow-icon {
    color: var(--color-primary-500);
}
.flow-icon:global(.off) {
    color: var(--color-gray-300);
}

.flow-icons{
    top: -0.4rem;
    --font-sm: 1.3rem;
}
.helper [dir]{
    fill: #25252B;
    cursor: pointer;
}
.helper [dir]:global(.active){
    fill: var(--color-primary-500);
}
</style>
