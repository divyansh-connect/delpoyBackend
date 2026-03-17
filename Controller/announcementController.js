const Announcement = require("../Model/announcement");
exports.postAnnouncementAdd = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const data = await Announcement.create({
      title,
      message,
      date: new Date(),
    });
    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnnouncementList = async (req, res, next) => {
  try {
    const announcementList = await Announcement.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "Announcement all find",
      data: announcementList,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  try {
    const announcementDeleted = await Announcement.findByIdAndDelete(id);

    if (!announcementDeleted) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
      data: announcementDeleted,
    });
  } catch (error) {
    next(error);
  }
};
