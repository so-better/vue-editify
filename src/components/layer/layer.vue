<template>
	<Teleport to="body">
		<Transition :name="animation ? 'editify-layer-' + animation : 'editify-layer'" @enter="handleEnter" @after-enter="el => emits('shown', el)" @after-leave="el => emits('hidden', el)">
			<div v-if="modelValue" class="editify-layer" :data-editify-placement="realPlacement || null" :style="{ zIndex: zIndex }" ref="elRef">
				<Triangle v-if="showTriangle" :color="border && borderColor ? borderColor : background" :background="background" :placement="triPlacement" ref="triangleRef" />
				<div ref="wrapRef" class="editify-layer-wrap" :class="{ 'editify-border': border }" :style="wrapStyle">
					<slot></slot>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { element as DapElement, event as DapEvent } from 'dap-util'
import { ObjectType } from '@/core/tool'
import { Triangle, TrianglePlacementType } from '@/components/triangle'
import { LayerPlacementType, LayerProps } from './props'

defineOptions({
	name: 'Layer'
})
const instance = getCurrentInstance()!
const props = defineProps(LayerProps)
const emits = defineEmits(['update:modelValue', 'show', 'shown', 'hidden'])

const realPlacement = ref<LayerPlacementType | null>(null)
const wrapRef = ref<HTMLElement | null>(null)
const elRef = ref<HTMLElement | null>(null)
const triangleRef = ref<InstanceType<typeof Triangle> | null>(null)

//三角形位置
const triPlacement = computed<TrianglePlacementType>(() => {
	if (realPlacement.value == 'bottom-start' || realPlacement.value == 'bottom' || realPlacement.value == 'bottom-end') {
		return 'top'
	}
	if (realPlacement.value == 'top-start' || realPlacement.value == 'top' || realPlacement.value == 'top-end') {
		return 'bottom'
	}
	if (realPlacement.value == 'left-start' || realPlacement.value == 'left' || realPlacement.value == 'left-end') {
		return 'right'
	}
	if (realPlacement.value == 'right-start' || realPlacement.value == 'right' || realPlacement.value == 'right-end') {
		return 'left'
	}
	return 'top'
})
//浮层主体样式
const wrapStyle = computed<ObjectType>(() => {
	return {
		borderColor: props.border ? props.borderColor || '' : '',
		background: props.background || '',
		color: props.color || ''
	}
})

//获取目标元素
const getNode = () => {
	if (!props.node) {
		return null
	}
	if (DapElement.isElement(props.node)) {
		return props.node as HTMLElement
	}
	return document.body.querySelector(props.node as string) as HTMLElement
}
//获取滚动容器元素
const getScrollNode = () => {
	if (!props.scrollNode) {
		return null
	}
	if (DapElement.isElement(props.scrollNode)) {
		return props.scrollNode as HTMLElement
	}
	return document.body.querySelector(props.scrollNode as string) as HTMLElement
}
//根据range设置三角形位置
const setTrianglePositionByRange = () => {
	const selection = window.getSelection()
	if (selection && selection.rangeCount) {
		const range = selection.getRangeAt(0)
		const rects = range.getClientRects()
		if (rects.length) {
			//range的第一个位置
			const firstRect = rects[0]
			//range的最后一个位置
			const lastRect = rects[rects.length - 1]
			if (realPlacement.value == 'top') {
				triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.right = 'auto'
				triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
				triangleRef.value!.$el.style.bottom = 'auto'
			} else if (realPlacement.value == 'top-start') {
				triangleRef.value!.$el.style.left = (wrapRef.value!.offsetWidth > firstRect.width ? firstRect.width : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.right = 'auto'
				triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
				triangleRef.value!.$el.style.bottom = 'auto'
			} else if (realPlacement.value == 'top-end') {
				triangleRef.value!.$el.style.left = 'auto'
				triangleRef.value!.$el.style.right = (wrapRef.value!.offsetWidth > firstRect.width ? firstRect.width : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
				triangleRef.value!.$el.style.bottom = 'auto'
			} else if (realPlacement.value == 'bottom') {
				triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.right = 'auto'
				triangleRef.value!.$el.style.top = 'auto'
				triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
			} else if (realPlacement.value == 'bottom-start') {
				triangleRef.value!.$el.style.left = (wrapRef.value!.offsetWidth > lastRect.width ? lastRect.width : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.right = 'auto'
				triangleRef.value!.$el.style.top = 'auto'
				triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
			} else if (realPlacement.value == 'bottom-end') {
				triangleRef.value!.$el.style.left = 'auto'
				triangleRef.value!.$el.style.right = (wrapRef.value!.offsetWidth > lastRect.width ? lastRect.width : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.top = 'auto'
				triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
			} else {
				triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
				triangleRef.value!.$el.style.right = 'auto'
				triangleRef.value!.$el.style.top = -triangleRef.value!.$el.offsetHeight + 1 + 'px'
				triangleRef.value!.$el.style.bottom = 'auto'
			}
		}
	}
}
//根据node设置三角形位置
const setTrianglePositionByNode = () => {
	const node = getNode()!
	if (!DapElement.isElement(node)) {
		return
	}
	if (realPlacement.value == 'top') {
		triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'top-start') {
		triangleRef.value!.$el.style.left = (wrapRef.value!.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'top-end') {
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.right = (wrapRef.value!.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.top = wrapRef.value!.offsetHeight - 1 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'bottom') {
		triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
	} else if (realPlacement.value == 'bottom-start') {
		triangleRef.value!.$el.style.left = (wrapRef.value!.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
	} else if (realPlacement.value == 'bottom-end') {
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.right = (wrapRef.value!.offsetWidth > node.offsetWidth ? node.offsetWidth : wrapRef.value!.offsetWidth) / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.bottom = wrapRef.value!.offsetHeight - 1 + 'px'
	} else {
		triangleRef.value!.$el.style.left = wrapRef.value!.offsetWidth / 2 - triangleRef.value!.$el.offsetWidth / 2 + 'px'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = -triangleRef.value!.$el.offsetHeight + 1 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	}
}
//根据range设置位置
const setPositionByRange = () => {
	//重置
	realPlacement.value = null
	const selection = window.getSelection()
	if (selection && selection.rangeCount) {
		const range = selection.getRangeAt(0)
		const rects = range.getClientRects()
		if (rects.length) {
			//range的第一个位置
			const firstRect = rects[0]
			//range的最后一个位置
			const lastRect = rects[rects.length - 1]
			//可视窗口高度
			const documentHeight = document.documentElement.clientHeight || window.innerHeight
			//可视窗口宽度
			const documentWidth = document.documentElement.clientWidth || window.innerWidth
			//滚动容器位置
			const scrollRect = DapElement.getElementBounding(getScrollNode() || document.documentElement)

			if (props.placement == 'top' || props.placement == 'top-start' || props.placement == 'top-end') {
				if (firstRect.top >= scrollRect.top && firstRect.top >= elRef.value!.offsetHeight) {
					realPlacement.value = props.placement
				} else if (documentHeight - lastRect.bottom >= scrollRect.bottom && documentHeight - lastRect.bottom >= elRef.value!.offsetHeight) {
					realPlacement.value = props.placement == 'top' ? 'bottom' : props.placement == 'top-start' ? 'bottom-start' : 'bottom-end'
				}
			} else if (props.placement == 'bottom' || props.placement == 'bottom-start' || props.placement == 'bottom-end') {
				if (documentHeight - lastRect.bottom >= scrollRect.bottom && documentHeight - lastRect.bottom >= elRef.value!.offsetHeight) {
					realPlacement.value = props.placement
				} else if (firstRect.top >= scrollRect.top && firstRect.top >= elRef.value!.offsetHeight) {
					realPlacement.value = props.placement == 'bottom' ? 'top' : props.placement == 'bottom-start' ? 'top-start' : 'top-end'
				}
			}

			//判断左右是否足够空间显示
			if (realPlacement.value == 'top') {
				if (documentWidth - firstRect.right + firstRect.width / 2 < elRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				} else if (firstRect.left + firstRect.width / 2 < elRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
			} else if (realPlacement.value == 'bottom') {
				if (documentWidth - lastRect.right + lastRect.width / 2 < elRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				} else if (lastRect.left + lastRect.width / 2 < elRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
			} else if (realPlacement.value == 'top-start') {
				if (documentWidth - firstRect.right + firstRect.width < elRef.value!.offsetWidth) {
					if (documentWidth - firstRect.right + firstRect.width / 2 >= elRef.value!.offsetWidth / 2) {
						realPlacement.value = 'top'
					} else {
						realPlacement.value = 'top-end'
					}
				}
			} else if (realPlacement.value == 'bottom-start') {
				if (documentWidth - lastRect.right + lastRect.width < elRef.value!.offsetWidth) {
					if (documentWidth - lastRect.right + lastRect.width / 2 >= elRef.value!.offsetWidth / 2) {
						realPlacement.value = 'bottom'
					} else {
						realPlacement.value = 'bottom-end'
					}
				}
			} else if (realPlacement.value == 'top-end') {
				if (firstRect.left + firstRect.width < elRef.value!.offsetWidth) {
					if (firstRect.left + firstRect.width / 2 >= elRef.value!.offsetWidth / 2) {
						realPlacement.value = 'top'
					} else {
						realPlacement.value = 'top-start'
					}
				}
			} else if (realPlacement.value == 'bottom-end') {
				if (lastRect.left + lastRect.width < elRef.value!.offsetWidth) {
					if (lastRect.left + lastRect.width / 2 >= elRef.value!.offsetWidth / 2) {
						realPlacement.value = 'bottom'
					} else {
						realPlacement.value = 'bottom-start'
					}
				}
			}
			nextTick(() => {
				//设置位置对应的样式
				if (realPlacement.value == 'top') {
					elRef.value!.style.left = firstRect.left + firstRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
					elRef.value!.style.right = 'auto'
					elRef.value!.style.top = firstRect.top - elRef.value!.offsetHeight + 'px'
					elRef.value!.style.bottom = 'auto'
				} else if (realPlacement.value == 'top-start') {
					elRef.value!.style.left = firstRect.left + 'px'
					elRef.value!.style.right = 'auto'
					elRef.value!.style.top = firstRect.top - elRef.value!.offsetHeight + 'px'
					elRef.value!.style.bottom = 'auto'
				} else if (realPlacement.value == 'top-end') {
					elRef.value!.style.left = 'auto'
					elRef.value!.style.right = documentWidth - firstRect.right + 'px'
					elRef.value!.style.top = firstRect.top - elRef.value!.offsetHeight + 'px'
					elRef.value!.style.bottom = 'auto'
				} else if (realPlacement.value == 'bottom') {
					elRef.value!.style.left = lastRect.left + lastRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
					elRef.value!.style.right = 'auto'
					elRef.value!.style.top = 'auto'
					elRef.value!.style.bottom = documentHeight - lastRect.bottom - elRef.value!.offsetHeight + 'px'
				} else if (realPlacement.value == 'bottom-start') {
					elRef.value!.style.left = lastRect.left + 'px'
					elRef.value!.style.right = 'auto'
					elRef.value!.style.top = 'auto'
					elRef.value!.style.bottom = documentHeight - lastRect.bottom - elRef.value!.offsetHeight + 'px'
				} else if (realPlacement.value == 'bottom-end') {
					elRef.value!.style.left = 'auto'
					elRef.value!.style.right = documentWidth - lastRect.right + 'px'
					elRef.value!.style.top = 'auto'
					elRef.value!.style.bottom = documentHeight - lastRect.bottom - elRef.value!.offsetHeight + 'px'
				} else {
					elRef.value!.style.top = 'auto'
					elRef.value!.style.bottom = Math.max(scrollRect.bottom, 0) + 'px'
					if (props.placement == 'top') {
						//top-end
						if (documentWidth - firstRect.right + firstRect.width / 2 < elRef.value!.offsetWidth / 2) {
							elRef.value!.style.left = 'auto'
							elRef.value!.style.right = documentWidth - firstRect.right + 'px'
						}
						//top-start
						else if (firstRect.left + firstRect.width / 2 < elRef.value!.offsetWidth / 2) {
							elRef.value!.style.left = firstRect.left + 'px'
							elRef.value!.style.right = 'auto'
						}
						//top
						else {
							elRef.value!.style.left = firstRect.left + firstRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
							elRef.value!.style.right = 'auto'
						}
					} else if (props.placement == 'bottom') {
						//bottom-end
						if (documentWidth - lastRect.right + lastRect.width / 2 < elRef.value!.offsetWidth / 2) {
							elRef.value!.style.left = 'auto'
							elRef.value!.style.right = documentWidth - lastRect.right + 'px'
						}
						//bottom-start
						else if (lastRect.left + lastRect.width / 2 < elRef.value!.offsetWidth / 2) {
							elRef.value!.style.left = lastRect.left + 'px'
							elRef.value!.style.right = 'auto'
						}
						//bottom
						else {
							elRef.value!.style.left = lastRect.left + lastRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
							elRef.value!.style.right = 'auto'
						}
					} else if (props.placement == 'top-start') {
						if (documentWidth - firstRect.right + firstRect.width < elRef.value!.offsetWidth) {
							//top
							if (documentWidth - firstRect.right + firstRect.width / 2 >= elRef.value!.offsetWidth / 2) {
								elRef.value!.style.left = firstRect.left + firstRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
								elRef.value!.style.right = 'auto'
							}
							//top-end
							else {
								elRef.value!.style.left = 'auto'
								elRef.value!.style.right = documentWidth - firstRect.right + 'px'
							}
						}
						//top-start
						else {
							elRef.value!.style.left = firstRect.left + 'px'
							elRef.value!.style.right = 'auto'
						}
					} else if (props.placement == 'bottom-start') {
						if (documentWidth - lastRect.right + lastRect.width < elRef.value!.offsetWidth) {
							//bottom
							if (documentWidth - lastRect.right + lastRect.width / 2 >= elRef.value!.offsetWidth / 2) {
								elRef.value!.style.left = lastRect.left + lastRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
								elRef.value!.style.right = 'auto'
							}
							//bottom-end
							else {
								elRef.value!.style.left = 'auto'
								elRef.value!.style.right = documentWidth - lastRect.right + 'px'
							}
						}
						//bottom-start
						else {
							elRef.value!.style.left = lastRect.left + 'px'
							elRef.value!.style.right = 'auto'
						}
					} else if (props.placement == 'top-end') {
						if (firstRect.left + firstRect.width < elRef.value!.offsetWidth) {
							//top
							if (firstRect.left + firstRect.width / 2 >= elRef.value!.offsetWidth / 2) {
								elRef.value!.style.left = firstRect.left + firstRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
								elRef.value!.style.right = 'auto'
							}
							//top-start
							else {
								elRef.value!.style.left = firstRect.left + 'px'
								elRef.value!.style.right = 'auto'
							}
						}
						//top-end
						else {
							elRef.value!.style.left = 'auto'
							elRef.value!.style.right = documentWidth - firstRect.right + 'px'
						}
					} else if (props.placement == 'bottom-end') {
						if (lastRect.left + lastRect.width < elRef.value!.offsetWidth) {
							//bottom
							if (lastRect.left + lastRect.width / 2 >= elRef.value!.offsetWidth / 2) {
								elRef.value!.style.left = lastRect.left + lastRect.width / 2 - elRef.value!.offsetWidth / 2 + 'px'
								elRef.value!.style.right = 'auto'
							}
							//bottom-start
							else {
								elRef.value!.style.left = lastRect.left + 'px'
								elRef.value!.style.right = 'auto'
							}
						}
						//bottom-end
						else {
							elRef.value!.style.left = 'auto'
							elRef.value!.style.right = documentWidth - lastRect.right + 'px'
						}
					}
				}
				//三角形位置
				if (props.showTriangle) {
					setTrianglePositionByRange()
				}
			})
		}
	}
}
//根据node设置位置
const setPositionByNode = () => {
	const node = getNode()!
	if (!DapElement.isElement(node)) {
		return
	}
	//重置
	realPlacement.value = null
	//关联元素位置
	const nodeRect = DapElement.getElementBounding(node)
	//滚动容器位置
	const scrollRect = DapElement.getElementBounding(getScrollNode() || document.documentElement)
	//设置真实的位置
	if (props.placement == 'top' || props.placement == 'top-start' || props.placement == 'top-end') {
		if (nodeRect.top >= scrollRect.top && nodeRect.top >= elRef.value!.offsetHeight) {
			realPlacement.value = props.placement
		} else if (nodeRect.bottom >= scrollRect.bottom && nodeRect.bottom >= elRef.value!.offsetHeight) {
			realPlacement.value = props.placement == 'top' ? 'bottom' : props.placement == 'top-start' ? 'bottom-start' : 'bottom-end'
		}
	} else if (props.placement == 'bottom' || props.placement == 'bottom-start' || props.placement == 'bottom-end') {
		if (nodeRect.bottom >= scrollRect.bottom && nodeRect.bottom >= elRef.value!.offsetHeight) {
			realPlacement.value = props.placement
		} else if (nodeRect.top >= scrollRect.top && nodeRect.top >= elRef.value!.offsetHeight) {
			realPlacement.value = props.placement == 'bottom' ? 'top' : props.placement == 'bottom-start' ? 'top-start' : 'top-end'
		}
	}
	//判断左右是否足够空间显示
	if (realPlacement.value == 'top') {
		if (nodeRect.right + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
			realPlacement.value = 'top-end'
		} else if (nodeRect.left + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
			realPlacement.value = 'top-start'
		}
	} else if (realPlacement.value == 'top-start') {
		if (nodeRect.right + node.offsetWidth < elRef.value!.offsetWidth) {
			if (nodeRect.right + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top'
			} else {
				realPlacement.value = 'top-end'
			}
		}
	} else if (realPlacement.value == 'top-end') {
		if (nodeRect.left + node.offsetWidth < elRef.value!.offsetWidth) {
			if (nodeRect.left + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top'
			} else {
				realPlacement.value = 'top-start'
			}
		}
	} else if (realPlacement.value == 'bottom') {
		if (nodeRect.right + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
			realPlacement.value = 'bottom-end'
		} else if (nodeRect.left + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
			realPlacement.value = 'bottom-start'
		}
	} else if (realPlacement.value == 'bottom-start') {
		if (nodeRect.right + node.offsetWidth < elRef.value!.offsetWidth) {
			if (nodeRect.right + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom'
			} else {
				realPlacement.value = 'bottom-end'
			}
		}
	} else if (realPlacement.value == 'bottom-end') {
		if (nodeRect.left + node.offsetWidth < elRef.value!.offsetWidth) {
			if (nodeRect.left + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom'
			} else {
				realPlacement.value = 'bottom-start'
			}
		}
	}

	nextTick(() => {
		//设置位置对应的样式
		if (realPlacement.value == 'top') {
			elRef.value!.style.left = nodeRect.left + node.offsetWidth / 2 - elRef.value!.offsetWidth / 2 + 'px'
			elRef.value!.style.right = 'auto'
			elRef.value!.style.top = nodeRect.top - elRef.value!.offsetHeight + 'px'
			elRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'top-start') {
			elRef.value!.style.left = nodeRect.left + 'px'
			elRef.value!.style.right = 'auto'
			elRef.value!.style.top = nodeRect.top - elRef.value!.offsetHeight + 'px'
			elRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'top-end') {
			elRef.value!.style.left = 'auto'
			elRef.value!.style.right = nodeRect.right + 'px'
			elRef.value!.style.top = nodeRect.top - elRef.value!.offsetHeight + 'px'
			elRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'bottom') {
			elRef.value!.style.left = nodeRect.left + node.offsetWidth / 2 - elRef.value!.offsetWidth / 2 + 'px'
			elRef.value!.style.right = 'auto'
			elRef.value!.style.top = 'auto'
			elRef.value!.style.bottom = nodeRect.bottom - elRef.value!.offsetHeight + 'px'
		} else if (realPlacement.value == 'bottom-start') {
			elRef.value!.style.left = nodeRect.left + 'px'
			elRef.value!.style.right = 'auto'
			elRef.value!.style.top = 'auto'
			elRef.value!.style.bottom = nodeRect.bottom - elRef.value!.offsetHeight + 'px'
		} else if (realPlacement.value == 'bottom-end') {
			elRef.value!.style.left = 'auto'
			elRef.value!.style.right = nodeRect.right + 'px'
			elRef.value!.style.top = 'auto'
			elRef.value!.style.bottom = nodeRect.bottom - elRef.value!.offsetHeight + 'px'
		} else {
			elRef.value!.style.top = 'auto'
			elRef.value!.style.bottom = Math.max(scrollRect.bottom, 0) + 'px'
			if (props.placement == 'top' || props.placement == 'bottom') {
				if (nodeRect.right + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
					elRef.value!.style.left = 'auto'
					elRef.value!.style.right = nodeRect.right + 'px'
				} else if (nodeRect.left + node.offsetWidth / 2 < elRef.value!.offsetWidth / 2) {
					elRef.value!.style.left = nodeRect.left + 'px'
					elRef.value!.style.right = 'auto'
				} else {
					elRef.value!.style.left = nodeRect.left + node.offsetWidth / 2 - elRef.value!.offsetWidth / 2 + 'px'
					elRef.value!.style.right = 'auto'
				}
			} else if (props.placement == 'top-start' || props.placement == 'bottom-start') {
				if (nodeRect.right + node.offsetWidth < elRef.value!.offsetWidth) {
					if (nodeRect.right + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
						elRef.value!.style.left = nodeRect.left + node.offsetWidth / 2 - elRef.value!.offsetWidth / 2 + 'px'
						elRef.value!.style.right = 'auto'
					} else {
						elRef.value!.style.left = 'auto'
						elRef.value!.style.right = nodeRect.right + 'px'
					}
				} else {
					elRef.value!.style.left = nodeRect.left + 'px'
					elRef.value!.style.right = 'auto'
				}
			} else if (props.placement == 'top-end' || props.placement == 'bottom-end') {
				if (nodeRect.left + node.offsetWidth < elRef.value!.offsetWidth) {
					if (nodeRect.left + node.offsetWidth / 2 >= elRef.value!.offsetWidth / 2) {
						elRef.value!.style.left = nodeRect.left + node.offsetWidth / 2 - elRef.value!.offsetWidth / 2 + 'px'
						elRef.value!.style.right = 'auto'
					} else {
						elRef.value!.style.left = nodeRect.left + 'px'
						elRef.value!.style.right = 'auto'
					}
				} else {
					elRef.value!.style.left = 'auto'
					elRef.value!.style.right = nodeRect.right + 'px'
				}
			}
		}
		//三角形位置
		if (props.showTriangle) {
			setTrianglePositionByNode()
		}
	})
}
//设置位置
const setPosition = () => {
	//如果根据range来定位
	if (props.useRange) {
		setPositionByRange()
	}
	//根据传入的node来定位
	else {
		setPositionByNode()
	}
}
//显示时
const handleEnter = (el: Element) => {
	setPosition()
	emits('show', el)
}
//窗口尺寸改动
const handleResize = () => {
	if (props.modelValue) {
		emits('update:modelValue', false)
	}
}
//点击定位元素和自身以外的元素关闭浮层
const handleClick = (e: Event) => {
	if (!DapElement.isElement(elRef.value)) {
		return
	}
	//如果在浮层内点击，不用关闭
	if (DapElement.isContains(elRef.value!, e.target as HTMLElement)) {
		return
	}
	//如果在浮层关联的元素内点击，不用关闭
	if (!props.useRange && getNode()! && DapElement.isContains(getNode()!, e.target as HTMLElement)) {
		return
	}
	//如果在insideElement规定的元素内，不用关闭
	if (props.insideElements.some(el => DapElement.isContains(el, e.target as HTMLElement))) {
		return
	}

	if (props.modelValue) {
		emits('update:modelValue', false)
	}
}

onMounted(() => {
	if (props.modelValue) {
		setPosition()
	}
	DapEvent.on(window, `mousedown.editify_layer_${instance.uid}`, handleClick)
	DapEvent.on(window, `resize.editify_layer_${instance.uid}`, handleResize)
})

onBeforeUnmount(() => {
	DapEvent.off(window, `mousedown.editify_layer_${instance.uid} resize.editify_layer_${instance.uid}`)
})

defineExpose({
	setPosition,
	elRef
})
</script>
<style scoped src="./layer.less"></style>
