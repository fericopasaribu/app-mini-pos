SELECT
  penjualan.kode,
  max(penjualan.tanggal) AS tanggal,
  count(penjualan.id) AS item,
  sum(penjualan.harga) AS total,
  to_char(
    max(penjualan.tanggal),
    'DD-MM-YYYY HH24:MI:SS' :: text
  ) AS tanggal_format
FROM
  (
    (
      tb_penjualan penjualan
      JOIN tb_barang barang ON ((penjualan.id_barang = barang.id))
    )
    JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
  )
GROUP BY
  penjualan.kode;