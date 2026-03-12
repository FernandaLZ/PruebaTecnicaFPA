import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDashboardPageComponent } from './clients-dashboard-page.component';

describe('ClientsDashboardPageComponent', () => {
  let component: ClientsDashboardPageComponent;
  let fixture: ComponentFixture<ClientsDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
