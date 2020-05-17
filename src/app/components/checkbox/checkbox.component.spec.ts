import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxHarness } from './checkbox-harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let harness: CheckboxHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckboxComponent
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      CheckboxHarness
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('CheckBox1 Click -> Input is Disabled', async () => {
    await harness.checkCheckBox1();
    fixture.detectChanges();
    const isDisabled = await harness.inputDisabled();
    expect(isDisabled).toBeTruthy();
  });

  it('CheckBox1 UnClick -> Input is Enabled', async () => {
    await harness.checkCheckBox1();
    fixture.detectChanges();

    await harness.uncheckCheckBox1();
    fixture.detectChanges();
    const isDisabled = await harness.inputDisabled();
    expect(isDisabled).toBeFalsy();
  });

  it('Button Click -> CheckBox2 Is Disabled', async () => {
    await harness.buttonClick();
    fixture.detectChanges();

    const isDisabled = await harness.checkBox2IsDisabled();
    expect(isDisabled).toBeTruthy();
  });

});
