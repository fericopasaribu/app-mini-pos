SELECT
  penjualan.kode,
  max(penjualan.tanggal) AS tanggal,
  count(penjualan.id) AS item,
  sum(penjualan.harga) AS total
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