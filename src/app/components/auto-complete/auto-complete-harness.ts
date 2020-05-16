import { ComponentHarness } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { dispatchFakeEvent } from 'src/app/testing-util/dispatch-fake-event';
import { ComponentFixture } from '@angular/core/testing';
import { AutoCompleteComponent } from './auto-complete.component';
import { By } from '@angular/platform-browser';

export class AutoCompleteHarness extends ComponentHarness {
  static hostSelector = 'app-auto-complete';

  private getCheckBoxLocator = this.locatorFor('[data-testctl="checkbox"]');

  private getIncputLocator = this.locatorFor(
    MatInputHarness.with({
        placeholder: 'Test',
    })
  );

  private getAutoCompleteLocator = this.locatorFor(MatAutocompleteHarness);

  async getAutoCompleteList(fixture: ComponentFixture<AutoCompleteComponent>): Promise<MatOptionHarness[]> {
    const ctrl = await this.getAutoCompleteLocator();
    const inputElement = fixture.debugElement.query(By.css('[data-testctl="autcompinput"]')).nativeElement;
    dispatchFakeEvent(inputElement, 'focusin');
    return await ctrl.getOptions();
  }

  async selectOption(selectionValue: string, fixture: ComponentFixture<AutoCompleteComponent>) {
    const ctrl = await this.getAutoCompleteLocator();
    const inputElement = fixture.debugElement.query(By.css('[data-testctl="autcompinput"]')).nativeElement;
    dispatchFakeEvent(inputElement, 'focusin');
    await ctrl.selectOption({text: selectionValue});
  }

  async toggleCheckBox(): Promise<void> {
    const chkbox = await this.getCheckBoxLocator();
    await chkbox.click();
  }

  async inputFocus(): Promise<void> {
    const input = await this.getIncputLocator();
    await input.focus();
  }

  async inputText(value: string): Promise<void> {
    const input = await this.getIncputLocator();
    await input.setValue(value);
  }

  async inputTextValue(): Promise<string> {
    const input = await this.getIncputLocator();
    return input.getValue();
  }

  async inputControlDisabledState(): Promise<boolean> {
    const input = await this.getIncputLocator();
    return input.isDisabled();
  }
}
