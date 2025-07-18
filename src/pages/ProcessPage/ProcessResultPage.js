import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import ProcessSteps from "../../components/ProcessResult/ProcessSteps";
import ProcessIntroduction from "../../components/ProcessResult/ProcessIntroduction";
import ProcessResultInput from "../../components/ProcessResult/ProcessResultInput";
import ProcessResultHistory from "../../components/ProcessResult/ProcessResultHistory";
import instance from "../../Axios/axiosConfig";
import { toast } from "react-toastify";

const ProcessResultPage = () => {
  const location = useLocation();
  const { SubprocessData, ProcessStepsData } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(null);
  const [stepResults, setStepResults] = useState([]);
  const [processSteps, setProcessSteps] = useState(ProcessStepsData || []);
  const [serviceData, setServiceData] = useState({ serviceName: "", imageUrl: "" });
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy access token
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  // Gọi API để lấy thông tin dịch vụ dựa trên processId
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!SubprocessData?.processId || !accessToken) return;
      try {
        const response = await instance.get(`/api/process/get-by-process-id/${SubprocessData.processId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.data.success && response.data.data.length > 0) {
          const service = response.data.data[0].service;
          setServiceData({
            serviceName: service.serviceName,
            imageUrl: service.imageUrl,
          });
        } else {
          toast.error(response.data.message || "Không thể lấy thông tin dịch vụ");
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        toast.error("Lỗi khi lấy thông tin dịch vụ");
      }
    };
    fetchServiceData();
  }, [SubprocessData, accessToken]);

  // Set step đầu tiên làm mặc định
  useEffect(() => {
    if (processSteps && processSteps.length > 0) {
      setCurrentStep(processSteps[0].processStep);
    }
  }, [processSteps]);

  // Lấy danh sách kết quả khi thay đổi step
  useEffect(() => {
    if (currentStep && accessToken) {
      fetchStepResults(currentStep.stepId);
    }
  }, [currentStep, accessToken]);

  // Hàm lấy kết quả theo stepId
  const fetchStepResults = async (stepId) => {
    setLoading(true);
    try {
      const response = await instance.get(`/api/process-step/result/${stepId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (response.data.success) {
        setStepResults(response.data.data);
      } else {
        setStepResults([]);
        console.log("No results found for this step");
      }
    } catch (error) {
      console.error("Error fetching step results:", error);
      setStepResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm kiểm tra step có kết quả hay không
  const checkStepHasResults = async (stepId) => {
    try {
      const response = await instance.get(`/api/process-step/result/${stepId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.success && response.data.data.length > 0;
    } catch (error) {
      return false;
    }
  };

  // Hàm tạo kết quả mới
  const createStepResult = async (formData) => {
    try {
      const response = await instance.post('/api/process-step/result/create', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Create successful results!");
        fetchStepResults(currentStep.stepId);
        return true;
      } else {
        toast.error(response.data.message || "Create failed results!");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the result.!");
      console.error("Error creating step result:", error);
      return false;
    }
  };

  // Hàm chuyển step
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <Header />
      <NavbarHeader />
      <div className="flex flex-col gap-5 p-6 mx-auto md:flex-row max-w-7xl pt-[130px] text-left">
        {/* Left Section: Process Steps */}
        <div className="md:w-1/3">
          <ProcessSteps 
            ProcessStepsData={processSteps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            checkStepHasResults={checkStepHasResults}
            accessToken={accessToken}
            serviceData={serviceData}
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5 md:w-2/3">
          <ProcessIntroduction 
            SubprocessData={SubprocessData}
            currentStep={currentStep}
          />
          <ProcessResultInput 
            subprocessId={SubprocessData.subprocessId}
            currentStep={currentStep}
            onSubmit={createStepResult}
          />
          <ProcessResultHistory 
            stepResults={stepResults}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessResultPage;