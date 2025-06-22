import defaultAvatar from '../../assets/images/default-avatar.png';

const ReportDetail = () => {
    return (
        <>
            <div className="bg-[#E6F0FA] p-4 mb-6 rounded-lg text-[#3E3F5E] text-left">
                This post is being reported by multiple users. Please review the content of the reports and decide whether to delete the post or not!
                <div className="flex mt-4 gap-3">
                    <button className="bg-[#EF3E36] text-white px-4 py-2 rounded mr-2 hover:bg-red-600 w-24">Refuse</button>
                    <button className="bg-[#3DB3FB] text-white px-4 py-2 rounded hover:bg-blue-600 w-24">Allow</button>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img src={defaultAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#3E3F5E]">Huu Thuc  -  <span className='p-2 bg-[#3DB3FB]/25 text-[#3DB3FB]'>Farmer</span></span>
                    <span className="text-gray-500">posted a post with the following content:</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col gap-4 text-[#3E3F5E]">
                    <div className="flex">
                        <div className="font-semibold text-left min-w-80">Content:</div>
                        <div className="font-normal">
                            Khi thiết kế UI cho dashboard quản lý AI checker các bài đăng, bạn cần đảm bảo giao diện rõ ràng, dễ theo dõi và phục vụ tốt cho mục tiêu quản lý
                        </div>
                    </div>

                    <div className="flex">
                        <div className="font-semibold text-left min-w-80">Hashtags:</div>
                        <div className="text-[#3DB3FB]">#group4 #se1707</div>
                    </div>

                    <div className="flex">
                        <div className="font-semibold text-left min-w-80">Category:</div>
                        <div className="font-normal">abc, xyz, 123</div>
                    </div>

                    <div className="flex">
                        <div className="font-semibold text-left min-w-80">Tag users:</div>
                        <div className="font-normal">phuong nam, dang khoa</div>
                    </div>

                    <div className="flex items-start">
                        <div className="font-semibold text-left min-w-80">Images:</div>
                        <div className="flex gap-4">
                            <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <img src="https://picsum.photos/200/300" alt="Image 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <img src="https://picsum.photos/200/300" alt="Image 2" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ReportDetail;