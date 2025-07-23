"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomError } from "@/components/CustomError";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomLoading from "@/components/CustomLoading";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { filterForName } from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function EditSatuanPage() {
  const params = useParams();
  const slug = Number(params.slug);

  const router = useRouter();

  const [form, setForm] = useState<{
    nama: string;
  }>({
    nama: "",
  });

  const [error, setError] = useState({
    nama: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await axios.get(`${CUSTOM_TEXT.api_satuan}/${slug}`, {
      validateStatus: () => true,
    });

    try {
      if (response.data.meta_data.success) {
        setForm({
          nama: response.data.result.nama ?? "",
        });
        setIsLoading(false);
      } else {
        router.replace("/404");
      }
    } catch {}
  }, [slug, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditData = async (nama: string) => {
    const errorTemp = {
      nama: !form.nama.trim(),
    };

    setError(errorTemp);

    const isValid = Object.values(errorTemp).every((v) => v === false);

    if (isValid) {
      const formData = new FormData();
      formData.append("nama", nama);

      const response = await axios.put(`${CUSTOM_TEXT.api_satuan}/${slug}`, formData, {
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
            message: CUSTOM_TEXT.info_sukses_ubah,
            duration: CUSTOM_TEXT.time_interval,
          });

        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_satuan}`,
            value: nama,
            message: CUSTOM_TEXT.info_gagal_ubah,
            duration: CUSTOM_TEXT.time_interval,
          });
        }
      } 
      catch {
        CustomToast({
          type: "error",
          source: "Message",
          value: CUSTOM_TEXT.info_error_server,
          message: "",
          duration: CUSTOM_TEXT.time_interval,
        });
      }
    }
  };

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_ubah_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <CustomLoading isLoading={isLoading}>
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
              label={CUSTOM_TEXT.button_ubah}
              className="btn-primary"
              icon={Check}
              onClick={() => handleEditData(form.nama)}
            />

            <CustomButton
              label={CUSTOM_TEXT.button_batal}
              className="btn-secondary"
              icon={Ban}
              onClick={() => router.back()}
            />
          </div>
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
