export default (_req: any, res: any) => {
  console.log('gravy');
  console.log(res);
  
  
  res.clearPreviewData()
  res.status(200).end()
}
