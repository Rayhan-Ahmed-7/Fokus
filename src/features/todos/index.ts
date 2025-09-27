// import { TodoLocalDataSource } from "./data/dataSource/local/TodoLocalDataSource";
import { FakeTodoRepositoryImpl } from "./data/repository/FakeTodoRepositoryImpl";
// import { TodoRepositoryImpl } from "./data/repository/TodoRepositoryImpl";

// const repo = new TodoRepositoryImpl(new TodoRemoteDataSource(new FetchAdapter()));
// export const todoRepo = new TodoRepositoryImpl(new TodoLocalDataSource());
export const todoRepo = new FakeTodoRepositoryImpl();
