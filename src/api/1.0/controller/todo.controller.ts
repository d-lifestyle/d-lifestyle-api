import { IController, IControllerRoutes, TodoProps } from "types";
import { Ok, UnAuthorized } from "utils";
import { Request, Response } from "express";
import { Todo } from "model";

export class ToDoController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.getAllTodo,
               method: "GET",
               path: "/todo",
          });
          this.routes.push({
               handler: this.GetTodoById,
               method: "GET",
               path: "/todo/:id",
          });
          this.routes.push({
               handler: this.UpdateTodoById,
               method: "PUT",
               path: "/todo/:id",
          });
          this.routes.push({
               handler: this.AddNewTodo,
               method: "POST",
               path: "/todo",
          });
          this.routes.push({
               handler: this.DeleteTodoById,
               method: "DELETE",
               path: "/todo/:id",
          });
     }

     public async getAllTodo(req: Request, res: Response) {
          try {
               const data = await Todo.find().sort({ createdAt: -1 });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetTodoById(req: Request, res: Response) {
          try {
               const data = await Todo.findById({ _id: req.params.id });
               return Ok(res, data);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async AddNewTodo(req: Request, res: Response) {
          try {
               const { task, title }: TodoProps = req.body;
               const newTodo = await new Todo({ task, title }).save();
               return Ok(res, `${newTodo.title} is created!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateTodoById(req: Request, res: Response) {
          try {
               const { task, title }: TodoProps = req.body;
               const updateTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, { $set: { task, title } });
               return Ok(res, `${updateTodo} is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteTodoById(req: Request, res: Response) {
          try {
               const data = await Todo.findByIdAndDelete({ _id: req.params.id });
               return Ok(res, `${data} is deleted!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
