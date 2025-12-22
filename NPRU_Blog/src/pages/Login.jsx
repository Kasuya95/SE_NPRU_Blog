import { useState } from "react";




const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      Swal.fire({
        icon: "error",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอก username และ password",
        confirmButtonText: "ตกลง",
        allowOutsideClick: false,
      });
      return;
    }

    try {
      const res = await authService.login(user.username, user.password);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ล็อคอินสำเร็จ",
          text: res.data.message || "คุณได้ล็อคอินเรียบร้อยแล้ว",
          allowOutsideClick: false,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          err.response?.data?.message || err.message || "ไม่สามารถล็อคอินได้",
        confirmButtonText: "ปิด",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="user"
              placeholder="Enter your username"
              className="input input-bordered"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

         

          
          
        </form>
      </div>
    </div>
  );
};

export default Login;
