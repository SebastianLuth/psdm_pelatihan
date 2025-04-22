import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const CORPKnowledgePage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div>
          <h1>Corp Knowledge</h1>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Watch a video about food and answer the questions
              </p>
            </div>
            <div className="text-sm font-semibold text-blue-500">5 points</div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Watch a video about food and answer the questions
              </p>
            </div>
            <div className="text-sm font-semibold text-blue-500">5 points</div>
          </div>


        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CORPKnowledgePage;
