"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomImageDialogForm } from "@/components/CustomImageDialogForm";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomLoading from "@/components/CustomLoading";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { formatNumber } from "@/lib/scripts";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DetailBarangPage() {
  const params = useParams();
  const slug = Number(params.slug);

  const router = useRouter();

  const [form, setForm] = useState<{
    kode: string;
    nama: string;
    harga: string;
    nama_satuan: string;
    foto: string | File | null;
  }>({
    kode: "",
    nama: "",
    harga: "",
    nama_satuan: "",
    foto: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await axios.get(`${CUSTOM_TEXT.api_barang}/${slug}`, {
      validateStatus: () => true,
    });

    try {
      if (response.data.meta_data.success) {
        setForm({
          kode: response.data.result.kode ?? "",
          nama: response.data.result.nama ?? "",
          harga: response.data.result.harga ?? "",
          nama_satuan: response.data.result.nama_satuan ?? "",
          foto: response.data.result.foto ?? null,
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

  const url = form.foto;
  const fullImage =
    form.foto === `${CUSTOM_TEXT.dir_images}/${CUSTOM_TEXT.file_noimage}`
      ? ``
      : `${CUSTOM_TEXT.api_file}/${form.foto}`;

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_detail_data} ${CUSTOM_TEXT.menu_barang}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-upload">
            <CustomImageDialogForm
              thumbnailSrc={fullImage}
              fullImageSrc={fullImage}
              alt={`Foto ${url}`}
            />
          </div>

          <div className="area-form-content mt-[-12px]">
            <div>
              <CustomLabel value={CUSTOM_TEXT.form_kode_barang} />
              <CustomInput value={form.kode} readOnly className="input-text" />
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_nama_barang} />
              <CustomInput value={form.nama} readOnly className="input-text" />
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_harga_barang} />
              <CustomInput
                value={formatNumber(Number(form.harga))}
                readOnly
                className="input-text"
              />
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_nama_satuan} />
              <CustomInput
                value={form.nama_satuan}
                readOnly
                className="input-text"
              />
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
