class ZCL_SORT_VIA_KEYWORD definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_TABLE) type ABADR_TAB_INT4 .
protected section.
private section.
ENDCLASS.



CLASS ZCL_SORT_VIA_KEYWORD IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SORT_VIA_KEYWORD=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method SORT.
    rv_table = iv_table.
    SORT rv_table.
  endmethod.
ENDCLASS.