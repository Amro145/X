import Notification from "../Models/notification.model.js"
export const getNotifictions = async (req, res) => {
    try {
        const me = req.user
        if (!me) return res.status(404).json({ message: "user not found" });
        const notifiction = await Notification.find({ to: { $in: me._id } }).populate({
            path: "from",
            select: "userName , profilePic"
        })
        // await Notification.updateMany({ to: me._id }, { read: true })

        return res.status(200).json(notifiction)
    } catch (error) {
        console.log("error in get notifictions", error);

        return res.status(500).json({ message: "error in get notifictions" })


    }
}
export const deleteNotifictions = async (req, res) => {
    const me = req.user
    try {
        await Notification.deleteMany({ to: me._id })
        return res.status(200).json({ message: "Notifiction Deleted" })

    } catch (error) {

        return res.status(500).json({ message: "Error in  Delete Notifiction" })


    }
}
export const deleteOneNotifiction = async (req, res) => {
    try {
        const notifictionId = req.params.id;
        const me = req.user;
        const notification = await Notification.findById(notifictionId);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notification.to.toString() !== me._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Notification.findByIdAndDelete(notifictionId);

        // Fetch updated notifications after deletion
        const notifications = await Notification.find({ to: { $in: me._id } }).populate({
            path: "from",
            select: "userName , profilePic",
        });

        return res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in deleting one notification:", error);
        return res.status(500).json({ message: "Error in deleting one notification" });
    }
};