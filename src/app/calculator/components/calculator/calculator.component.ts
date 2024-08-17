import { Component, ChangeDetectionStrategy, viewChildren, inject, computed } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent)


  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());


  handleClickedButton(value: { key: string }) {
    this.calculatorService.constuctNumber(value.key);
  }


  handleKeyboardEvent(event: KeyboardEvent) {
    const keysEqivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Delete: 'C',
      X: '*',
      '/': '÷',
    }

    const key = event.key;

    const keyValue = keysEqivalents[key] || key;

    this.handleClickedButton({ key: keyValue });

    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle({ key: keyValue });
    })


  }
}
