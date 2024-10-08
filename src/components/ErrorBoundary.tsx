import { Component, ErrorInfo, ReactNode } from 'react';

// Definimos las props que acepta el componente
interface Props {
    children: ReactNode;
}

// Definimos el estado del componente
interface State {
    hasError: boolean;
}

// ErrorBoundary es un componente de clase que captura errores en sus componentes hijos
class ErrorBoundary extends Component<Props, State> {
    // Inicializamos el estado
    public state: State = {
        hasError: false
    };

    // Este método estático se llama cuando ocurre un error
    // Actualiza el estado para indicar que ha ocurrido un error
    public static getDerivedStateFromError(error: Error): State {
        console.log(error);
        return { hasError: true };
    }

    // Este método se llama después de que ocurre un error
    // Es útil para registrar el error en un servicio de reporte de errores
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    // El método render determina qué se muestra
    public render() {
        // Si hay un error, mostramos un mensaje de error
        if (this.state.hasError) {
            return <h1>Sorry.. there was an error</h1>;
        }

        // Si no hay error, renderizamos los componentes hijos normalmente
        return this.props.children;
    }
}

export default ErrorBoundary;
