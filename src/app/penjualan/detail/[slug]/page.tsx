"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomLoading from "@/components/CustomLoading";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DetailSatuanPage() {
  const params = useParams();
  const slug = Number(params.slug);

  const router = useRouter();

  const [form, setForm] = useState<{
    nama: string;
  }>({
    nama: "",
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

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_detail_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-form-content">
            <div>
              <CustomLabel value={CUSTOM_TEXT.form_nama_satuan} />
              <CustomInput value={form.nama} readOnly className="input-text" />
            </div>
          </div>

          <div className="area-form-button">
            <CustomButton
              label={CUSTOM_TEXT.button_kembali}
              className="btn-secondary ml-0"
              icon={ArrowLeft}
              onClick={() => router.back()}
            />
          </div>
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
