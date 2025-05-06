import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickMortyListComponent } from './rick-morty-list.component';

describe('RickMortyListComponent', () => {
  let component: RickMortyListComponent;
  let fixture: ComponentFixture<RickMortyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickMortyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RickMortyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
