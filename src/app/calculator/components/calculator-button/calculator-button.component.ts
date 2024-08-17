import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  }
})
export class CalculatorButtonComponent {

  public isPressed = signal<boolean>(false)
  public onClick = output<{ key: string }>()

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  })

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  })


  handleClick() {
    const value = this.contentValue()!.nativeElement.innerText;
    if (!value) return
    this.onClick.emit({ key: value.trim() });
  }

  public keyboardPressedStyle({ key }: { key: string }) {
    if (!this.contentValue()) return
    const value = this.contentValue()!.nativeElement.innerText;
    if (value !== key) return


    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
