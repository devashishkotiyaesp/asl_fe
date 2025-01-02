export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  option?: object;
  role?: string;
}

export type RoleType = 'Admin' | 'Student' | 'Teacher' | 'Organization';
