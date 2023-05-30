import { Request, Response } from 'express'
import { Client } from 'model';
import { ClientProps, IController, IControllerRoutes } from "types";
import { UnAuthorized, Ok } from "utils";

export class ClientController implements IController {
  public routes: IControllerRoutes[] = [];
  constructor() {
    this.routes.push({ handler: this.ClientList, method: "GET", path: "/client" })
    this.routes.push({ handler: this.ClientListById, method: "GET", path: "/client/:id" })
    this.routes.push({ handler: this.RegisterNewClient, method: "POST", path: "/client" })
    this.routes.push({ handler: this.UpdateClientList, method: "PUT", path: "/client/:id" })
    this.routes.push({ handler: this.DeleteClientList, method: "DELETE", path: "/client/:id" })
  }

  public async ClientList(_: Request, res: Response) {
    try {
      const data: ClientProps[] = await Client.find().sort({
        createdAt: -1
      })
      return Ok(res, data)
    } catch (err) {
      return UnAuthorized(res, err)
    }
  }

  public async ClientListById(req: Request, res: Response) {
    try {
      const params: string = req.params.id
      const data: ClientProps = await Client.findById({ _id: params })
      return Ok(res, data)
    } catch (err) {
      return UnAuthorized(res, err)
    }
  }

  public async RegisterNewClient(req: Request, res: Response) {
    try {
      const { contact, description, displayName, image }: ClientProps = req.body
      const data = await new Client({
        image,
        displayName,
        description,
        contact: {
          mobile: contact.mobile,
          email: contact.email,
          address: contact.address
        }
      }).save()

      return Ok(res, `${data.displayName} is registered`)
    } catch (err) {
      return UnAuthorized(res, err)
    }
  }

  public async UpdateClientList(req: Request, res: Response) {
    try {
      const params = req.params.id

      const data = await Client.findOneAndUpdate({ _id: params as string }, { $set: req.body })

      return Ok(res, `${data.displayName} is uploaded`)
    } catch (err) {
      return UnAuthorized(res, err)
    }
  }

  public async DeleteClientList(req: Request, res: Response) {
    try {
      const params = req.params.id
      const data = await Client.findOneAndDelete({ _id: params })
      return Ok(res, `${data.displayName} is deleted`)
    } catch (err) {
      return UnAuthorized(res, err)
    }
  }
}
