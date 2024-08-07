import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import DeliveriesService from "../../services/deliveires/deliveries.service";
import {authAdmin} from "../../middlewares/auth.middleware";

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

DeliveriesController.post('/create', async (req: Request, res: Response) => {
    try {
        const delivery = req.body;
        const newDelivery = await DeliveriesService.createDelivery(delivery);
        res.status(HttpStatus.SUCCESS).json({
            data: newDelivery
        });
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

DeliveriesController.patch('/update/:id', authAdmin, async (req: Request, res: Response) => {
    try {
        const id_delivery = req.params.id;
        console.log(id_delivery);
        const delivery = req.body;
        console.log(req.body)
        DeliveriesService.updateDelivery(id_delivery, delivery)
            .then(() => {
                res.status(HttpStatus.SUCCESS).json({message: "chỉnh sửa đơn vị vận chuyển thành công"})
            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err})
            })
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

DeliveriesController.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id_delivery = req.params.id;
        DeliveriesService.deleteDelivery(id_delivery)
            .then(() => {
                res.status(HttpStatus.SUCCESS).json({message: "xóa đơn vị vận chuyển thành công"})
            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err})
            })
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})


export default DeliveriesController
