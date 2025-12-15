import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../AuthContext';
import { useGetMeQuery } from '@/src/redux/services/authApi';
import { UserResponseDto } from '@/src/types/user/user.dto';

jest.mock('@/src/redux/services/authApi');
const mockUseGetMeQuery = useGetMeQuery as jest.MockedFunction<typeof useGetMeQuery>;

function TestComponent() {
  const { user, isLoading, error } = useAuthContext();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || 'Error occurred'}</div>;
  if (user) return <div>User: {user.name}</div>;
  return <div>No user</div>;
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra loading cuando está cargando', () => {
    mockUseGetMeQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('muestra usuario cuando está autenticado', () => {
    const mockUser: UserResponseDto = { 
      id: '1', 
      name: 'Dr. Juan', 
      email: 'juan@test.com', 
      role: 'doctor',
      createdAt: '2024-01-01T00:00:00Z'
    };
    
    mockUseGetMeQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('User: Dr. Juan')).toBeInTheDocument();
  });

  it('muestra error cuando falla la autenticación', () => {
    const mockError = { message: 'Token inválido' };
    
    mockUseGetMeQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Error: Token inválido')).toBeInTheDocument();
  });

  it('lanza error si se usa fuera del provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuthContext must be used within an AuthProvider');
    
    consoleSpy.mockRestore();
  });
});


