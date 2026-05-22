// Design System em código — barrel de exports. Congelado após o M1.

// Core
export { Icon, type IconName, type IconProps } from './Icon';
export { Spinner, type SpinnerProps } from './Spinner';
export { PulseDot } from './PulseDot';
export { SoundWave } from './SoundWave';
export { Btn, type BtnProps, type BtnVariant, type BtnSize } from './Btn';
export { Pill, type PillProps, type PillTone } from './Pill';
export { Card, type CardProps } from './Card';
export { Input, Textarea, Select } from './Field';
export { Alert, type AlertProps, type AlertTone } from './Alert';
export { Modal, type ModalProps } from './Modal';
export { ToastProvider, useToast, type ToastOptions } from './Toast';
export { EmptyState, type EmptyStateProps } from './EmptyState';
export { Skeleton, type SkeletonProps } from './Skeleton';
export { LogoMark, Wordmark } from './Logo';

// Produto
export { StartConversionBtn } from './product/StartConversionBtn';
export { ModeSelector, type ConversionMode } from './product/ModeSelector';
export { DeviceIndicator } from './product/DeviceIndicator';
export { ConnStatus, type ConnState } from './product/ConnStatus';
export { AudioPlayer } from './product/AudioPlayer';
export { LibrasViewer, type LibrasState } from './product/LibrasViewer';
export { type AvatarLoadStatus } from './product/VLibrasCanvas';
export { Transcription } from './product/Transcription';
export { ConversationCard } from './product/ConversationCard';
export { A11yStatus, type A11yCheck } from './product/A11yStatus';
