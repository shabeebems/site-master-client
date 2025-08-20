import { fetchDetails } from "@/app/api/api";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

type PageProps = {
  cancel: () => void;
  workerAddition: (workerId: string) => void;
};

type IWorker = {
  name: string;
  _id: string;
};

const AddWorker: React.FC<PageProps> = React.memo(({ cancel, workerAddition }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRoles = await fetchDetails("get_workerRoles");
        setRoles(getRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchData();
  }, []);

  const roleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getWorkers = await fetchDetails(`get_workers_to_add_task/${e.target.value}`);
    setWorkers(getWorkers);
  };

  const handleWorkerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkerId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedWorkerId) {
      alert("Please select a worker.");
      setIsLoading(false);
      return;
    }

    try {
      workerAddition(selectedWorkerId);
    } catch (error) {
      console.error("Error assigning worker:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto bg-white shadow-md px-4 py-2 rounded-xl border"
    >
      <select
        name="role"
        className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
        onChange={roleChange}
        required
      >
        <option value="">Select role</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
      <select
        name="name"
        value={selectedWorkerId}
        onChange={handleWorkerChange}
        className="p-2 border rounded w-full md:w-32 text-sm outline-none focus:border-blue-500"
        required
      >
        <option value="">Select worker</option>
        {workers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Buttons */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={cancel}
            type="button"
            className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md text-xs w-full md:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs w-full md:w-auto hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
});

export default AddWorker;
