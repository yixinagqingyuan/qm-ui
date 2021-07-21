
export interface ElMessageBox {
  /** Show a message box */
  (message: string, title?: string, type?: string): Promise<MessageBoxData>

  /** Show a message box */
  (options: ElMessageBoxOptions): Promise<MessageBoxData>

  /** Show an alert message box */
  alert: ElMessageBoxShortcutMethod

  /** Show a confirm message box */
  confirm: ElMessageBoxShortcutMethod

  /** Show a prompt message box */
  prompt: ElMessageBoxShortcutMethod

  /** Set default options of message boxes */
  setDefaults(defaults: ElMessageBoxOptions): void

  /** Close current message box */
  close(): void
}