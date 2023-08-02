export interface Tasks {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description: string;
  image: string;
}

export interface TasksInput {
  title: string;
  description: string;
  image: string;
} 