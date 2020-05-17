import { ComponentHarness } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

export class CheckboxHarness extends ComponentHarness {

    static hostSelector = 'app-checkbox';
    private getCheckBox1Locator = this.locatorFor(
        MatCheckboxHarness.with({
            label: 'CheckBox1(InputDisabled)'
        })
    );
    private getCheckBox2Locator = this.locatorFor(
        MatCheckboxHarness.with({
            label: 'CheckBox2(DisabledTarget)'
        })
    );
    private getInputLocator = this.locatorFor('[data-testctl="targetinput"]');
    private getButtonLocator = this.locatorFor('[data-testctl="disabledbutton"]');

    async checkCheckBox1(): Promise<void> {
        const ctrl = await this.getCheckBox1Locator();
        await ctrl.check();
    }

    async uncheckCheckBox1(): Promise<void> {
        const ctrl = await this.getCheckBox1Locator();
        await ctrl.uncheck();
    }

    async inputDisabled(): Promise<void> {
        const ctrl = await this.getInputLocator();
        return await ctrl.getProperty('disabled');
    }

    async buttonClick(): Promise<void> {
        const ctrl = await this.getButtonLocator();
        await ctrl.click();
    }

    async checkBox2IsDisabled(): Promise<boolean> {
        const ctrl = await this.getCheckBox2Locator();
        return await ctrl.isDisabled();
    }

}
