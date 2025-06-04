import { useEffect, useRef, useState } from "react";

// Hook useInfiniteScroll
// direction: "up" (cho chat, tải thêm khi cuộn lên đầu) hoặc "down" (cho bài post, tải thêm khi cuộn xuống cuối)
const useInfiniteScroll = ({
    fetchData,
    containerRef,
    direction = "down",
    threshold = 50,
    hasMore,
    loading,
    loadingMore,
    take, // Thêm tham số take
    data, // Thêm tham số data để theo dõi sự thay đổi
}) => {
    const [skip, setSkip] = useState(0);
    const previousScrollHeightRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (!hasMore || loading || loadingMore) return;

            const { scrollTop, scrollHeight, clientHeight } = container;

            // Cuộn lên (cho chat)
            if (direction === "up" && scrollTop < threshold) {
                setSkip((prevSkip) => prevSkip + take);
                fetchData({ currentSkip: skip + take, previousScrollHeightRef });
            }
            // Cuộn xuống (cho bài post)
            else if (direction === "down" && scrollHeight - scrollTop - clientHeight < threshold) {
                setSkip((prevSkip) => prevSkip + take);
                fetchData({ currentSkip: skip + take });
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading, loadingMore, skip, fetchData, containerRef, direction, threshold, take]);

    // Duy trì vị trí cuộn khi tải thêm dữ liệu (chỉ cần cho cuộn lên)
    useEffect(() => {
        if (direction === "up" && previousScrollHeightRef.current && containerRef.current) {
            const newScrollHeight = containerRef.current.scrollHeight;
            containerRef.current.scrollTop = newScrollHeight - previousScrollHeightRef.current;
        }
    }, [data, containerRef, direction]);

    return { skip, setSkip };
};

export default useInfiniteScroll;