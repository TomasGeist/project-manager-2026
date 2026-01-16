# Toast Component

Componente reutilizable para mostrar notificaciones tipo toast con mensajes del backend.

## Uso

### 1. Importar el hook y el componente

```typescript
import { useToast } from '../../shared/hooks/useToast';
import { Toast } from '../../shared/components/Toast';
```

### 2. Usar el hook en tu componente

```typescript
const { toast, showToast, hideToast } = useToast();
```

### 3. Mostrar el toast

```typescript
showToast(
  'Mensaje a mostrar',
  'success', // 'success' | 'error' | 'warning' | 'info'
  'bottom-right' // 'center' | 'bottom-right'
);
```

### 4. Agregar el componente Toast al render

```typescript
<Toast toast={toast} onClose={hideToast} />
```

## Comportamiento

- **Desktop**: 
  - `center`: Se muestra en el centro superior de la pantalla
  - `bottom-right`: Se muestra en la esquina inferior derecha

- **Mobile**: 
  - Siempre se muestra en la parte inferior central ocupando todo el ancho
  - Ignora el parámetro de posición en dispositivos móviles

## Ejemplo completo

```typescript
import { useEffect } from 'react';
import { useToast } from '../../shared/hooks/useToast';
import { Toast } from '../../shared/components/Toast';

export default function MyComponent() {
  const { toast, showToast, hideToast } = useToast();
  const [serverMessage, setServerMessage] = useState(null);

  // Mostrar toast cuando cambia el mensaje del servidor
  useEffect(() => {
    if (serverMessage) {
      showToast(
        serverMessage.message,
        serverMessage.type,
        serverMessage.type === 'error' ? 'center' : 'bottom-right'
      );
    }
  }, [serverMessage, showToast]);

  return (
    <div>
      {/* Tu contenido */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
```

## Personalización

- **duration**: Puedes cambiar la duración del toast (por defecto 5000ms)

```typescript
<Toast toast={toast} onClose={hideToast} duration={3000} />
```
