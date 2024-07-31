import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import DeliveriesService from "../../services/deliveires/deliveries.service";

const DeliveriesController = Router();

DeliveriesController.get('', async (req: Request, res: Response) => {
    try {
        const deliveriesList = await DeliveriesService.findAllDeliveries();
        res.status(HttpStatus.SUCCESS).json({
            data: deliveriesList
        });
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})


export default DeliveriesController
