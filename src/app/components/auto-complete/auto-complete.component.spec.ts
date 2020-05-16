import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AutoCompleteComponent } from './auto-complete.component';
import { MaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AutoCompleteHarness } from './auto-complete-harness';
import { AutoCompleteService } from './auto-complete.service';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const genMockData = () => {
  const val = Array.from(new Array(10)).map((_, i) => {
    const ret = { id: i, name: `${i}さん` };
    return ret;
  });
  return of(val);
};

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let harness: AutoCompleteHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [AutoCompleteComponent],
      providers: [
        {
          provide: AutoCompleteService,
          useValue: {
            get$: () => genMockData()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      AutoCompleteHarness
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('init option list', async () => {
    const datas = await harness.getAutoCompleteList(fixture);
    expect(datas.length).toEqual(10);
  });

  it ('filter option list', async () => {
    await harness.inputText('0');
    fixture.detectChanges();
    const datas = await harness.getAutoCompleteList(fixture);
    expect(datas.length).toEqual(1);
  });

  it ('option selection', async () => {
    await harness.inputText('');
    fixture.detectChanges();
    await harness.selectOption('0さん', fixture);
    const iputValue = await harness.inputTextValue();
    expect(iputValue).toEqual('0さん');
  });

  it ('CheckBoxToggle -> Input is Disabled', async () => {
    await harness.toggleCheckBox();
    const isDisabled = await harness.inputControlDisabledState;
    expect(isDisabled).toBeTruthy();
  });

});
