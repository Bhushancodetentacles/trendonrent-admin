import { toast } from "react-toastify";

export const Errorhandler = (e) => {
  console.log(e)
    return toast.error(
      e?.reason ? e?.reason : e.error?.message ? e.error?.message : e?.message,
      { autoClose: 6000 }
    );
};
