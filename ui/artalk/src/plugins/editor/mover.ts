import EditorPlugin from './_plug'
import * as Utils from '@/lib/utils'

export default class Mover extends EditorPlugin {
  private isMoved = false

  move(afterEl: HTMLElement) {
    if (this.isMoved) return
    this.isMoved = true

    const editorEl = this.kit.useUI().$el

    editorEl.after(Utils.createElement('<div class="atk-editor-travel-placeholder"></div>'))

    const $travelPlace = Utils.createElement('<div></div>')
    afterEl.after($travelPlace)
    $travelPlace.replaceWith(editorEl)

    editorEl.classList.add('atk-fade-in') // 添加渐入动画
    editorEl.classList.add('editor-traveling')
  }

  back() {
    if (!this.isMoved) return
    this.isMoved = false
    this.kit
      .useArtalkRootEl()
      .querySelector('.atk-editor-travel-placeholder')
      ?.replaceWith(this.kit.useUI().$el)
    this.kit.useUI().$el.classList.remove('editor-traveling')
  }
}
