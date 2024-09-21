// Define the Exam type directly in this file
export interface Exam {
    id: number;
    patientId: number;
    doctorId: number;
    type: string;
    date: string;
    result: string | null;
    patient: {
      namePatient: string;
    };
    doctor: {
      nameDoctor: string;
    };
  }
  
  export const fetchExams = async (setExams: React.Dispatch<React.SetStateAction<Exam[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await fetch("http://localhost:8080/admin/exams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }
  
      const data = await response.json();
      setExams(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setLoading(false);
    }
  };
  
  export const handleEditExam = (exam: Exam, setEditingExam: React.Dispatch<React.SetStateAction<Exam | null>>) => {
    setEditingExam(exam);
  };
  
  export const handleSaveEdit = async (
    event: React.FormEvent,
    editingExam: Exam | null,
    setEditingExam: React.Dispatch<React.SetStateAction<Exam | null>>,
    setExams: React.Dispatch<React.SetStateAction<Exam[]>>
  ) => {
    event.preventDefault();
    if (!editingExam) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
  
    try {
      const response = await fetch(`http://localhost:8080/admin/exams/${editingExam.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingExam),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update exam");
      }
  
      setExams((prevExams) =>
        prevExams.map((exam) =>
          exam.id === editingExam.id ? editingExam : exam
        )
      );
      setEditingExam(null);
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };
  
  export const handleCancelExam = async (
    id: number,
    setExams: React.Dispatch<React.SetStateAction<Exam[]>>
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
  
    try {
      const response = await fetch(`http://localhost:8080/admin/exams/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to cancel exam");
      }
  
      setExams((prevExams) => prevExams.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error("Error canceling exam:", error);
    }
  };