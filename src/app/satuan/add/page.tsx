"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomError } from "@/components/CustomError";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { filterForName } from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddSatuanPage() {
  const router = useRouter();

  const [form, setForm] = useState<{
    nama: string;
  }>({
    nama: "",
  });

  const [error, setError] = useState({
    nama: false,
  });

  const handleSaveData = async (nama: string) => {
    const errorTemp = {
      nama: !form.nama.trim(),
    };

    setError(errorTemp);

    const isValid = Object.values(errorTemp).every((v) => v === false);

    if (isValid) {
      const formData = new FormData();
      formData.append("nama", nama);

      const response = await axios.post(`${CUSTOM_TEXT.api_satuan}`, formData, {
        validateStatus: () => true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      try {
        if (response.data.meta_data.success) {
          CustomToast({
            type: "success",
            source: `Data ${CUSTOM_TEXT.menu_satuan}`,
            value: nama,
            message: CUSTOM_TEXT.info_sukses_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });

          setForm({ nama: "" });
        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_satuan}`,
            value: nama,
            message: CUSTOM_TEXT.info_gagal_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });
        }
      } catch {
        CustomToast({
          type: "error",
          source: `Data ${CUSTOM_TEXT.menu_satuan}`,
          value: nama,
          message: response.data.meta_data.message.name,
          duration: CUSTOM_TEXT.time_interval,
        });
      }
    }
  };

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <div className="area-form-content">
          <div>
            <CustomLabel value={CUSTOM_TEXT.form_nama_satuan} required />
            <CustomInput
              value={form.nama}
              onChange={(value) => {
                const result = filterForName(value);
                setForm({ ...form, nama: result });
              }}
              className={error.nama ? "input-error" : "input-text"}
              maxLength={10}
              placeholder={CUSTOM_TEXT.format_isi_nama}
            />
            {error.nama && (
              <CustomError
                value={`${CUSTOM_TEXT.form_nama_satuan} ${CUSTOM_TEXT.info_wajib_isi}`}
              />
            )}
          </div>
        </div>

        <div className="area-form-button">
          <CustomButton
            label={CUSTOM_TEXT.button_simpan}
            className="btn-primary"
            icon={Check}
            onClick={() => handleSaveData(form.nama)}
          />

          <CustomButton
            label={CUSTOM_TEXT.button_batal}
            className="btn-secondary"
            icon={Ban}
            onClick={() => router.back()}
          />
        </div>
      </CustomCard>
    </div>
  );
}
