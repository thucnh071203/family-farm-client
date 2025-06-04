import React from "react";

// Dữ liệu mẫu dựa trên ProcessResponseDTO
const processResponse = {
  success: true,
  message: "Successfully retrieved process data",
  count: 1,
  data: [
    {
      process: {
        processId: "process123",
        expertId: "expert123",
        farmerId: "farmer456",
        serviceId: "service789",
        bookingServiceId: "booking101",
        processTittle: "SUPPORT REACTJS TUTORIALS",
        description: "Hướng dẫn cơ bản về ReactJS cho người mới bắt đầu",
        numberOfSteps: 3,
        continueStep: 2,
        processStatus: "IN_PROGRESS",
        createAt: "2025-05-26T09:00:00Z",
        updateAt: "2025-05-26T10:00:00Z",
        deleteAt: null,
        isCompletedByExpert: false,
        isCompletedByFarmer: true,
        isDelete: false,
      },
      steps: [
        {
          stepId: "step1",
          processId: "process123",
          stepNumber: 1,
          stepTitle: "How to download environment",
          stepDesciption: "Steps to set up the ReactJS environment",
          isCompleted: true,
          completedAt: "2025-05-26T09:30:00Z",
          stepResults: [
            {
              stepResultId: "result1",
              stepId: "step1",
              stepResultComment: "<p><p>Tình trạng cây:<ol><li>Ban đầu, cây có dấu hiệu vàng lá lan rộng, lá héo nhanh. Sau khi bổ sung phân bón NPK kết hợp với vi lượng sắt và magiê, màu lá đã cải thiện rõ rệt, xanh lại dần.</li><li>Ban đầu, cây có dấu hiệu vàng lá lan rộng, lá héo nhanh. Sau khi bổ sung phân bón NPK kết hợp với vi lượng sắt và magiê, màu lá đã cải thiện rõ rệt, xanh lại dần.</li></ol></p></p>",
              stepResultImage: JSON.stringify([
                "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
                "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
              ]),
              createdAt: "2025-05-26T09:30:00Z",
            },
          ],
        },
        {
          stepId: "step2",
          processId: "process123",
          stepNumber: 2,
          stepTitle: "Introduction",
          stepDesciption: "Introduction to ReactJS basics",
          isCompleted: false,
          completedAt: null,
          stepResults: [
            {
              stepResultId: "result2",
              stepId: "step2",
              stepResultComment: "<p><p>Tưới nước và thoát nước:<ul><li>Trước đây, đất thường bị úng do mưa kéo dài. Tôi đã điều chỉnh lượng nước tưới, đào thêm rãnh thoát nước. Hiện tại, độ ẩm đất ổn định, rễ cây phát triển tốt hơn.</li></ul></p><p>Kiểm soát sâu bệnh:<ul><li>Sau khi sử dụng thuốc trừ sâu sinh học và neem oil, số lượng sâu hại giảm đáng kể. Tôi cũng tiến hành cắt tỉa lá bị bệnh, ngăn chặn sự lây lan.</li></ul></p></p>",
              createdAt: "2025-05-25T10:00:00Z",
            },
          ],
        },
      ],
    },
  ],
};

const ProcessResultHistory = () => {
  // Lấy tất cả stepResults từ các steps
  const stepResults = processResponse.data[0].steps.flatMap((step) => step.stepResults);

  // Sắp xếp theo createdAt (mới nhất trước)
  const sortedResults = stepResults.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-10">
      {sortedResults.map((result, index) => (
        <div key={result.stepResultId}>
          <div className="flex">
            <p className="py-3 px-10 bg-[#3DB3FB]/25 text-[#3DB3FB]">
              {new Date(result.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full p-5 mt-5 bg-white border border-gray-200 border-solid rounded-lg shadow-xl rich-text-editor">
            <h3 className="mb-2 text-lg font-bold">Result:</h3>
            <div
              className="text-sm prose text-gray-800"
              dangerouslySetInnerHTML={{ __html: result.stepResultComment }}
            />
            {result.stepResultImage && JSON.parse(result.stepResultImage).length > 0 && (
              <>
                <h3 className="mt-4 text-lg font-semibold">
                  Actual Image{JSON.parse(result.stepResultImage).length > 1 ? "s" : ""}
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {JSON.parse(result.stepResultImage).map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`Result ${index + 1} Image ${idx + 1}`}
                      className="object-cover w-full h-40 rounded-lg"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessResultHistory;