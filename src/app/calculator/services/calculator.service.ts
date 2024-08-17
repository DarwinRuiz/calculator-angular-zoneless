import { Injectable, signal } from '@angular/core';

const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators: string[] = ['+', '-', '*', '/', '÷', 'x'];
const specialOperators: string[] = ['C', 'CE', '+/-', '=', '%', '.', 'Backspace', 'Enter'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');


  public constuctNumber(value: string) {
    const aceptInputs = new Set<string>([...numbers, ...operators, ...specialOperators]);

    if (!aceptInputs.has(value)) {
      console.error('Invalid input', value);
      return;
    }

    if (value === '=' || value === 'Enter') {
      this.calculateResult();
      return;
    }


    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {

      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((previousValue) => previousValue.slice(0, -1));

      return;
    }


    if (operators.includes(value)) {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((previousValue) => `${previousValue}.`)
      return;
    }

    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((previousValue) => previousValue.slice(1));
        return;
      }

      this.resultText.update((previousValue) => `-${previousValue}`);
      return;
    }

    if (numbers.includes(value)) {

      if (this.resultText() === '0' || this.resultText() === '-0') {
        if (this.resultText().includes('-')) {
          this.resultText.set(`-${value}`);
          return;
        }


        this.resultText.set(value);
        return;
      }

      this.resultText.update((previousValue) => `${previousValue}${value}`);
      return;
    }

  }



  private calculateResult(): void {
    const firstNumber = parseFloat(this.subResultText());
    const secondNumber = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case 'x':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      case '÷':
        result = firstNumber / secondNumber;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }
}
