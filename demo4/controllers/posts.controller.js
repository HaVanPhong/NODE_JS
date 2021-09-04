module.exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: 200,
    data: [
      {
        title: "Người dân TP HCM sẽ được phát lương thực tận nhà",
        content:
          "Quân đội sẽ lập đội công tác đặc biệt, với sự tham gia của cựu chiến binh, phụ nữ, thanh niên, đưa lương thực, thực phẩm, thuốc điều trị đến từng nhà dân.",
      },
      {
        title: "Thêm 10.657 ca Covid-19",
        content:
          "Trong 10.657 ca nhiễm Bộ Y tế công bố tối 20/8 có 10.650 ca ở 43 tỉnh thành, tăng 11 ca so với hôm qua; 12.756 người khỏi bệnh, cao nhất trong một ngày tính từ trước tới nay; 390 ca tử vong.",
      },
    ],
  });
};
