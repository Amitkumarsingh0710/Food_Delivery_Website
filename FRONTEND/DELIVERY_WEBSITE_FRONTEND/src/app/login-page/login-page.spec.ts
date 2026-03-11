// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginPage } from './login-page';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoginPage]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login-page';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  
  // Mock objects
  const mockUserService = {
    validateUser: vi.fn(),
    getUsers: vi.fn()
  };
  
  const mockRouter = {
    navigate: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage, FormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock window.alert
    vi.stubGlobal('alert', vi.fn());
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // --- POSITIVE TEST CASE ---
  it('should succeed login and navigate when credentials are valid', () => {
    // Arrange
    mockUserService.validateUser.mockReturnValue(true);
    mockUserService.getUsers.mockReturnValue([{ email: 'test@test.com' }]);
    
    const mockForm = {
      value: { email: 'test@test.com', password: 'password123' }
    } as NgForm;

    // Act
    component.onSubmit(mockForm);

    // Assert
    expect(mockUserService.validateUser).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(window.alert).toHaveBeenCalledWith('Login Successful ...');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  // --- NEGATIVE TEST CASE ---
  it('should fail login and stay on page when credentials are invalid', () => {
    // Arrange
    mockUserService.validateUser.mockReturnValue(false);
    
    const mockForm = {
      value: { email: 'wrong@test.com', password: 'wrongpassword' }
    } as NgForm;

    // Act
    component.onSubmit(mockForm);

    // Assert
    expect(mockUserService.validateUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login failed - Invalid Credentials...');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
